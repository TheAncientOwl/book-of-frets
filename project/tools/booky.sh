#!/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2026
# -----------------------------------------------------------------------------
# @file booky.sh
# @author Alexandru Delegeanu
# @version 1.0
# @description Main CLI entrypoint for BookOfFrets tooling
# -----------------------------------------------------------------------------

set -euo pipefail

# Resolve project root (directory where this script lives)
BOOKY_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ensure BOOK_OF_FRETS_ROOT is set (fallback to BOOKY_ROOT)
if [ -z "${BOOK_OF_FRETS_ROOT:-}" ]; then
  export BOOK_OF_FRETS_ROOT="$BOOKY_ROOT"
fi

print_help() {
  cat <<EOF
📘 BookOfFrets CLI (booky)

Usage:
  ./booky.sh <command> [args...]

Commands:

  --webpify <input_path> [quality]
      Convert image to WEBP format.
      Example:
        ./booky.sh --webpify image.png 85

  --jpegify <input_path>
      Convert image to JPEG format.
      Example:
        ./booky.sh --jpegify image.png

  --resize <input_path> <width> <height>
      Resize image to given dimensions.
      Example:
        ./booky.sh --resize image.webp 128 128

  --song <dir-name> <cover-image-src-path>
      Create a new song directory with cover + boilerplate.
      Example:
        ./booky.sh --song my-song ./cover.png

  --render-pdf <config_path> [--theme <theme_config_path>]
      Render a single song PDF (optionally themed).
      Example:
        ./booky.sh --render-pdf public/songs/my-song/config.json
        ./booky.sh --render-pdf public/songs/my-song/config.json --theme public/themes/banana/config.json

  --render-pdf-all
      Render PDFs for all songs with all themes.

  --render-pdf-themes <config_path>
      Render PDFs for a single song with all themes.

  --help
      Show this help message.
EOF
}

if [ $# -eq 0 ]; then
  print_help
  exit 0
fi

command="$1"
shift

case "$command" in
  --help)
    print_help
    ;;

  --webpify)
    if [ $# -lt 1 ]; then
      echo "❌ Usage: ./booky.sh --webpify <input_path> [quality]"
      exit 1
    fi
    python3 "$BOOK_OF_FRETS_ROOT/project/tools/webpify/run.py" "$@"
    ;;

  --jpegify)
    if [ $# -lt 1 ]; then
      echo "❌ Usage: ./booky.sh --jpegify <input_path>"
      exit 1
    fi
    "$BOOK_OF_FRETS_ROOT/project/tools/jpegify/run.sh" "$@"
    ;;

  --resize)
    if [ $# -ne 3 ]; then
      echo "❌ Usage: ./booky.sh --resize <input_path> <width> <height>"
      exit 1
    fi
    python3 "$BOOK_OF_FRETS_ROOT/project/tools/image-resizer/run.py" "$@"
    ;;

  --song)
    if [ $# -ne 2 ]; then
      echo "❌ Usage: ./booky.sh --song <dir-name> <cover-image-src-path>"
      exit 1
    fi
    "$BOOK_OF_FRETS_ROOT/project/tools/song/create.sh" "$@"
    ;;

  --render-pdf)
    if [ $# -lt 1 ]; then
      echo "❌ Usage: ./booky.sh --render-pdf <config_path> [--theme <theme_config_path>]"
      exit 1
    fi
    python3 "$BOOK_OF_FRETS_ROOT/project/tools/pdf/render.py" "$@"
    ;;

  --render-pdf-all)
    "$BOOK_OF_FRETS_ROOT/project/tools/pdf/render_all_pdf.sh"
    ;;

  --render-pdf-themes)
    if [ $# -ne 1 ]; then
      echo "❌ Usage: ./booky.sh --render-pdf-themes <config_path>"
      exit 1
    fi
    "$BOOK_OF_FRETS_ROOT/project/tools/pdf/render_pdf_themes.sh" "$@"
    ;;

  *)
    echo "❌ Unknown command: $command"
    echo ""
    print_help
    exit 1
    ;;
esac
