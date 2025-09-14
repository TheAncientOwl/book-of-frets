# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file run.sh
# @author Alexandru Delegeanu
# @version 0.1
# @description Runs @see webpify.py
#

if [ -z "$BOOK_OF_FRETS_ROOT" ]; then
  echo "Error: BOOK_OF_FRETS_ROOT is not set."
  exit 1
fi

home=$BOOK_OF_FRETS_ROOT/tools/webpify

if [ ! -d "$home/.venv" ]; then
    $home/install_deps.sh
fi

source $home/.venv/bin/activate

python3 $home/webpify.py "$1"

deactivate
