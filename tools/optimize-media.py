#!/usr/bin/env python3
"""Shrink the media library: drop unreferenced files, cap dimensions, re-encode
to WebP, then rewrite every reference in the site sources.

Dry run (default):  python3 tools/optimize-media.py
Apply changes:      python3 tools/optimize-media.py --apply

Requires Pillow (pip install Pillow). Safe to re-run: files that are already
optimal, animated, or not raster images are left untouched.
"""
import io, json, os, sys, warnings
warnings.filterwarnings("ignore")
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAX_EDGE = 1600
PHOTO_Q = 82      # lossy quality for photographic content
GRAPHIC_Q = 90    # lossy candidate for flat graphics / screenshots
COLOR_CUTOFF = 20000  # above this an image is treated as photographic

RASTER = ("png", "jpg", "jpeg", "gif")
# Every place a media path could be mentioned.
TEXT_DIRS = ["_posts", "_tabs", "_includes", "_layouts", "_data", "_sass",
             "_javascript", "_plugins", "en", "assets", ".github"]
TEXT_FILES = ["_config.yml", "index.html", "README.md", "AGENTS.md",
              "firebase.json", "nginx.conf"]
TEXT_EXT = (".md", ".html", ".yml", ".yaml", ".json", ".js", ".scss", ".css",
            ".rb", ".txt", ".xml", ".conf")

os.chdir(ROOT)


def media_files():
    for d, _, fs in os.walk("uploads"):
        for f in sorted(fs):
            yield os.path.join(d, f)


def source_texts():
    for sub in TEXT_DIRS:
        for d, _, fs in os.walk(sub):
            for f in fs:
                if f.endswith(TEXT_EXT):
                    yield os.path.join(d, f)
    for f in TEXT_FILES:
        if os.path.exists(f):
            yield f


# ---------------------------------------------------------------- stage 1
def find_orphans():
    """A file is an orphan when its basename appears in no source file at all.
    Matching is case-insensitive and on basename only: both choices
    deliberately err toward keeping a file."""
    blob = []
    for p in source_texts():
        try:
            blob.append(open(p, encoding="utf-8", errors="ignore").read())
        except OSError:
            pass
    blob = "\n".join(blob).lower()
    return [p for p in media_files() if os.path.basename(p).lower() not in blob]


# ---------------------------------------------------------------- stage 2
def encode(path):
    """Return (webp_bytes, note) or (None, reason) if the file should stay put."""
    try:
        im = Image.open(path)
        im.load()
    except Exception as e:
        return None, f"unreadable ({e.__class__.__name__})"

    fmt = im.format
    # Only GIF/APNG multi-frame files are animations. A JPEG in MPO form (iPhone
    # depth-map photos) also reports two frames, but the second is not content.
    if fmt in ("GIF", "PNG") and getattr(im, "n_frames", 1) > 1:
        return None, "animated"

    # Bake in EXIF rotation before we discard metadata, or phone photos come out sideways.
    im = ImageOps.exif_transpose(im)

    w, h = im.size
    resized = False
    if max(w, h) > MAX_EDGE:
        r = MAX_EDGE / max(w, h)
        im = im.resize((max(1, round(w * r)), max(1, round(h * r))), Image.LANCZOS)
        resized = True

    has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
    im = im.convert("RGBA" if has_alpha else "RGB")

    # Flatten a fully-opaque alpha channel; it only costs bytes.
    if has_alpha:
        alpha = im.getchannel("A")
        if alpha.getextrema() == (255, 255):
            im = im.convert("RGB")
            has_alpha = False

    # A JPEG source is already lossy, so lossless re-encoding cannot win even
    # when the palette is small; treat it as photographic regardless of colours.
    colors = im.convert("RGB").getcolors(maxcolors=COLOR_CUTOFF)
    photographic = fmt in ("JPEG", "MPO") or colors is None

    cands = []
    if photographic:
        b = io.BytesIO()
        im.save(b, "WEBP", quality=PHOTO_Q, method=6)
        cands.append((b.getvalue(), f"lossy q{PHOTO_Q}"))
    else:
        # Flat graphics and screenshots: lossless usually wins, but let the bytes decide.
        b = io.BytesIO()
        im.save(b, "WEBP", lossless=True, method=6)
        cands.append((b.getvalue(), "lossless"))
        b = io.BytesIO()
        im.save(b, "WEBP", quality=GRAPHIC_Q, method=6)
        cands.append((b.getvalue(), f"lossy q{GRAPHIC_Q}"))

    data, note = min(cands, key=lambda c: len(c[0]))
    if resized:
        note += f", {w}x{h}->{im.size[0]}x{im.size[1]}"
    return data, note


def main():
    dry = "--apply" not in sys.argv
    report = {"deleted": [], "converted": [], "kept": []}

    orphans = find_orphans()
    orphan_set = set(orphans)
    for p in orphans:
        report["deleted"].append({"path": p, "bytes": os.path.getsize(p)})
        if not dry:
            os.remove(p)

    rename = {}
    for p in media_files():
        if p in orphan_set:
            continue
        ext = p.rsplit(".", 1)[-1].lower()
        if ext not in RASTER:
            report["kept"].append({"path": p, "bytes": os.path.getsize(p), "why": "not raster"})
            continue
        orig = os.path.getsize(p)
        data, note = encode(p)
        if data is None:
            report["kept"].append({"path": p, "bytes": orig, "why": note})
            continue
        if len(data) >= orig:
            report["kept"].append({"path": p, "bytes": orig, "why": "webp not smaller"})
            continue
        new = p.rsplit(".", 1)[0] + ".webp"
        if new != p and os.path.exists(new):
            report["kept"].append({"path": p, "bytes": orig, "why": "target exists"})
            continue
        report["converted"].append({"path": p, "new": new, "before": orig,
                                    "after": len(data), "note": note})
        rename[p] = new
        if not dry:
            with open(new, "wb") as fh:
                fh.write(data)
            if new != p:
                os.remove(p)

    # ------------------------------------------------------------ stage 3
    edits = 0
    files_touched = set()
    if not dry:
        for src in source_texts():
            try:
                txt = open(src, encoding="utf-8").read()
            except (OSError, UnicodeDecodeError):
                continue
            out = txt
            for old, new in rename.items():
                if old in out:
                    out = out.replace(old, new)
            if out != txt:
                open(src, "w", encoding="utf-8").write(out)
                files_touched.add(src)
                edits += 1
    report["refs_rewritten_in_files"] = edits
    json.dump(report, open(os.environ.get("MEDIA_REPORT", "/tmp/media-report.json"), "w"), indent=1)

    d = sum(x["bytes"] for x in report["deleted"])
    cb = sum(x["before"] for x in report["converted"])
    ca = sum(x["after"] for x in report["converted"])
    kb = sum(x["bytes"] for x in report["kept"])
    print(f"{'DRY RUN' if dry else 'APPLIED'}")
    print(f"  orphans deleted : {len(report['deleted']):4d}  {d/1048576:7.2f} MB")
    print(f"  converted       : {len(report['converted']):4d}  {cb/1048576:7.2f} MB -> {ca/1048576:.2f} MB")
    print(f"  kept as-is      : {len(report['kept']):4d}  {kb/1048576:7.2f} MB")
    print(f"  uploads total   : {(cb+kb+d)/1048576:7.2f} MB -> {(ca+kb)/1048576:.2f} MB")
    print(f"  source files rewritten: {edits}")


main()
