#!/usr/bin/env python3
"""
Move Markdown files from content/uploads into year subfolders based on date metadata.
Usage: python3 scripts/reorganize_uploads_by_year.py --content content/uploads [--dry-run] [--git]
"""
# ...existing code...
import os
import re
import argparse
import shutil
import subprocess
from datetime import datetime

def parse_date_from_header(path):
    with open(path, 'r', encoding='utf-8') as f:
        head = f.read(2048)
    # YAML frontmatter
    m = re.search(r'^---\s*\n(.*?)\n---\s*\n', head, re.DOTALL)
    if m:
        md = re.search(r'^\s*date\s*:\s*(.+)$', m.group(1), re.IGNORECASE | re.MULTILINE)
        if md:
            return try_parse(md.group(1).strip().strip('"\''))
    # Pelican-style metadata: Date: YYYY-MM-DD
    m = re.search(r'(?m)^Date\s*:\s*(.+)$', head)
    if m:
        return try_parse(m.group(1).strip())
    # fallback: date in filename
    m = re.search(r'(\d{4})-(\d{2})-(\d{2})', path)
    if m:
        return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return None

def try_parse(s):
    for fmt in ('%Y-%m-%d', '%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M:%S'):
        try:
            return datetime.strptime(s, fmt)
        except Exception:
            pass
    try:
        return datetime.fromisoformat(s)
    except Exception:
        return None

def main():
    p = argparse.ArgumentParser()
    p.add_argument('--content', default='content/uploads')
    p.add_argument('--dry-run', action='store_true')
    p.add_argument('--git', action='store_true', help='use git mv when possible')
    args = p.parse_args()

    for root, _, files in os.walk(args.content):
        for fn in files:
            if not fn.lower().endswith('.md'):
                continue
            src = os.path.join(root, fn)
            dt = parse_date_from_header(src)
            if not dt:
                print(f'SKIP (no date): {src}')
                continue
            dest_dir = os.path.join(args.content, str(dt.year))
            os.makedirs(dest_dir, exist_ok=True)
            dest = os.path.join(dest_dir, fn)
            if os.path.abspath(src) == os.path.abspath(dest):
                continue
            print(f'MOVE: {src} -> {dest}')
            if args.dry_run:
                continue
            if args.git:
                subprocess.check_call(['git', 'mv', src, dest])
            else:
                shutil.move(src, dest)

if __name__ == '__main__':
    main()
# ...existing code...