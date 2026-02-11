# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2026
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file render_all_pdf.sh
# @author Alexandru Delegeanu
# @version 1.1
# @description Runs @see make_pdf.py for all songs with all themes
#

set -eo pipefail

themes=("banana" "bright-sky" "bubble-gum" "catpuccin" "cherry" "hazbin" "lavander" "nature" "peach" "pop-n-lock")

find public/songs -type f -name "config.json" | while read config; do
    echo ">> Making \"$config\" with theme \"defalt-dark\""
    python3 project/tools/pdf/render.py "$config" --chords public/chords/index.json

    for theme in "${themes[@]}"; do
        echo ">> Making \"$config\" with theme \"$theme\""
        python3 project/tools/pdf/render.py "$config" --chords public/chords/index.json --theme public/themes/"$theme"/config.json
    done
done
