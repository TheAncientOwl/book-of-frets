#!/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file run.sh
# @author Alexandru Delegeanu
# @version 1.0
# @description Helper to generate song config boilerplate + cover images
#

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <dir-name> <cover-image-src-path>"
  exit 1
fi

dir_name="$1"
cover_image_src_path="$2"

echo "[Info] Directory name: ${dir_name}"
echo "[Info] Cover image path: ${cover_image_src_path}"

# Create song directory
dir_path="$BOOK_OF_FRETS_ROOT/public/songs/$dir_name"
echo "[Info] Creating song directory path: ${dir_path}"
mkdir -p $dir_path
echo "[Info] Created song directory path: ${dir_path} successfully"
echo ""

# Move cover image in dir
extension="${cover_image_src_path##*.}"
cover_dest_path="${dir_path}/cover.${extension}"
echo "[Info] Moving cover image to: ${cover_dest_path}"
mv "$cover_image_src_path" "$cover_dest_path"
echo "[Info] Cover image moved successfully"
echo ""

# Webpify cover image
webp_cover_dest_path="${cover_dest_path%.*}.webp"
$BOOK_OF_FRETS_ROOT/project/tools/webpify/run.sh "$cover_dest_path" 85
rm $cover_dest_path

# Resize cover image
$BOOK_OF_FRETS_ROOT/project/tools/song/resize-cover/run.sh $webp_cover_dest_path

# Create song config boilerplate
$BOOK_OF_FRETS_ROOT/project/tools/song/boilerplate/create.sh $dir_name
