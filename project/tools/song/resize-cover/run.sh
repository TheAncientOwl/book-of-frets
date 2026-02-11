# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file run.sh
# @author Alexandru Delegeanu
# @version 1.0
# @description Generate necessary cover image sizes
#


if [ -z "$BOOK_OF_FRETS_ROOT" ]; then
  echo "Error: BOOK_OF_FRETS_ROOT is not set."
  exit 1
fi

python3 $BOOK_OF_FRETS_ROOT/project/tools/image-resizer/run.py "$1" 64 64
python3 $BOOK_OF_FRETS_ROOT/project/tools/image-resizer/run.py "$1" 128 128
python3 $BOOK_OF_FRETS_ROOT/project/tools/image-resizer/run.py "$1" 192 192
