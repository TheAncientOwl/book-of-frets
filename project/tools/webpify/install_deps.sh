# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file install_deps.sh
# @author Alexandru Delegeanu
# @version 1.1
# @description Install dependencies for webpify tool
#

if [ -z "$BOOK_OF_FRETS_ROOT" ]; then
  echo "Error: BOOK_OF_FRETS_ROOT is not set."
  exit 1
fi

home=$BOOK_OF_FRETS_ROOT/project/tools/webpify

cd $home

# if [ ! -d ".venv" ]; then
#   python3 -m venv "$home/.venv"
# fi

# source "$home/.venv/bin/activate"

# pip3 install -r requirements.txt

cd -
