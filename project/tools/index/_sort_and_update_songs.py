import json
import sys
from pathlib import Path
from typing import Any, Dict, List


PRELOAD_START = "<!-- Begin Preload LCP SongsIndex images -->"
PRELOAD_END = "<!-- End Preload LCP SongsIndex images -->"


def sort_key(entry: Dict[str, Any]):
    # Artists -> Title -> Type
    artists = entry.get("artists", [])
    title = entry.get("title", "")
    types = entry.get("type", [])

    artists_key = ", ".join(artists).lower()
    title_key = title.lower()
    type_key = ", ".join(types).lower()

    return (artists_key, title_key, type_key)


def build_preload_block(directory: str) -> str:
    return f"""    <link
      rel="preload"
      as="image"
      href="/songs/{directory}/cover-192x192.webp"
      imagesrcset="/songs/{directory}/cover-64x64.webp 64w,
                  /songs/{directory}/cover-128x128.webp 128w,
                  /songs/{directory}/cover-192x192.webp 192w"
      imagesizes="(max-width: 430px) 64px, 80px"
    />"""


def update_index_html(index_html_path: Path, preloads: List[Dict[str, Any]]):
    html = index_html_path.read_text(encoding="utf-8")

    if PRELOAD_START not in html or PRELOAD_END not in html:
        print("Could not find preload markers in index.html")
        return

    start_index = html.index(PRELOAD_START) + len(PRELOAD_START)
    end_index = html.index(PRELOAD_END, start_index)

    preload_blocks = []
    for entry in preloads:
        directory = entry.get("directory")
        if directory:
            preload_blocks.append(build_preload_block(directory))

    new_preload_section = "\n" + "\n".join(preload_blocks) + "\n\n    "

    updated_html = html[:start_index] + new_preload_section + html[end_index:]

    if updated_html != html:
        index_html_path.write_text(updated_html, encoding="utf-8")
    else:
        print("No changes were applied to index.html")


def main():
    if len(sys.argv) != 3:
        print("Usage: python sort.py <path-to-index.json> <path-to-index.html>")
        sys.exit(1)

    index_path = Path(sys.argv[1])
    index_html_path = Path(sys.argv[2])

    if not index_path.exists():
        print(f"File not found: {index_path}")
        sys.exit(1)

    if not index_html_path.exists():
        print(f"File not found: {index_html_path}")
        sys.exit(1)

    with index_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    sorted_index: List[Dict[str, Any]] = sorted(data["index"], key=sort_key)
    data["index"] = sorted_index

    with index_path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    update_index_html(index_html_path, sorted_index[:11])

    print(f"Sorted {len(sorted_index)} entries successfully.")
    print("Updated index.html preload covers (first 10 entries).")


if __name__ == "__main__":
    main()
