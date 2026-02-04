# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2026
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file make_pdf_themes.sh
# @author Alexandru Delegeanu
# @version 1.0
# @description Runs @see make_pdf.py for a song with all themes
#

if [ -z "$1" ]; then
    echo "Usage: $0 <config_path>"
    exit 1
fi

config="$1"

themes=("banana" "bright-sky" "bubble-gum" "catpuccin" "cherry" "hazbin" "lavander" "nature" "peach" "pop-n-lock")

echo ">> Making \"$config\" with theme \"default-dark\""
python3 project/tools/pdf/make_pdf.py "$config" --chords public/chords/index.json

for theme in "${themes[@]}"; do
    echo ">> Making \"$config\" with theme \"$theme\""
    python3 project/tools/pdf/make_pdf.py "$config" --chords public/chords/index.json --theme public/themes/"$theme"/config.json
done
