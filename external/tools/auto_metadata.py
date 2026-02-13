from pathlib import Path


def auto_metadata(path: Path):
    for file in sorted(path.iterdir()):
        if file.name.startswith("."):
            print(f"Skip {file} because it is a hidden file")
            continue
        if file.is_file():
            lines = []
            print(f"Processing {file}")
            with open(file, "r") as f:
                lines = f.readlines()
            # delete line starts with "id", "permalink" and "guid"
            lines = [
                line for line in lines
                if not line.startswith(("id", "permalink", "guid"))
                ]
            with open(file, "w") as f:
                f.writelines(lines)
        else:
            print(f"Skip {file} because it is not a file")


def main():
    auto_metadata(Path("/Users/zhe203/dev/blog/content"))


if __name__ == "__main__":
    main()
