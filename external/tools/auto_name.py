from pathlib import Path


def get_title_and_date_from_metadata(file: Path):
    title = None
    date = None

    with open(file, "r") as f:
        lines = f.readlines()
        for line in lines:
            line = line.lower()
            if line.startswith("title"):
                title = line.split(":")[1].strip()
            if line.startswith("date"):
                date = line.split(":")[1].strip()
                # get the first part of date
                date = date.replace("T", " ")
                date = date.replace("t", " ")
                date = date.split(" ")[0]
            if title and date:
                break
    return title, date


def auto_rename_blogs(path: Path):
    for file in path.iterdir():
        if file.name.startswith("."):
            print(f"Skip {file} because it is a hidden file")
            continue
        if file.is_file():
            # print(f"Start to rename files in {file}")
            # get Title and Date from metadata
            title, date = get_title_and_date_from_metadata(file)
            file_name = f"{date}-{title}.md"
            # print(f"Rename {file} to {file_name}")
            print(f"Rename to: {file_name}")
            file.rename(path.joinpath(file_name))
        else:
            print(f"Skip {file} because it is not a file")


def main():
    auto_rename_blogs(Path("/Users/zhe203/dev/blog/content"))


if __name__ == "__main__":
    main()
