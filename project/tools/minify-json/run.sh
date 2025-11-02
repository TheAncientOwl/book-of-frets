# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file run.sh
# @author Alexandru Delegeanu
# @version 0.2
# @description Utility to minify JSON file disk size
#

if [ -z "$1" ]; then
  echo "❌ Error: No JSON file provided."
  echo "Usage: $0 path/to/file.json"
  exit 1
fi

input_file="$1"

if [ ! -f "$input_file" ]; then
  echo "❌ Error: File '$input_file' not found."
  exit 1
fi

# Determine output file name
output_file="${input_file%.json}.min.json"

# Minify using jq
jq -c . "$input_file" > "$output_file"

if [ $? -eq 0 ]; then
  echo "✅ Minified file created: $output_file"

  # Show file sizes for comparison
  echo ""
  echo "📏 File sizes:"
  ls -l "$input_file" "$output_file"

  # Calculate and print saved space
  orig_size=$(stat -f "%z" "$input_file")
  min_size=$(stat -f "%z" "$output_file")
  saved=$((orig_size - min_size))
  percent=$(awk "BEGIN {printf \"%.2f\", ($saved / $orig_size) * 100}")
  echo ""
  echo "💾 Saved space: ${saved} bytes (${percent}%)"
  echo ""

  # Compress the minified JSON file with gzip, keeping the original minified file
  gzip -k -9 "$output_file"
  archived_file="${output_file}.gz"
  compressed_file="${output_file}.gz.bin"
  mv $archived_file $compressed_file

  if [ -f "$compressed_file" ]; then
    echo "✅ Compressed file created: $compressed_file"

    # Show sizes of minified and compressed files
    echo ""
    echo "📏 Minified and compressed file sizes:"
    ls -l "$output_file" "$compressed_file"

    # Calculate and print additional saved space by gzipping
    compressed_size=$(stat -f "%z" "$compressed_file")
    gzip_saved=$((min_size - compressed_size))
    gzip_percent=$(awk "BEGIN {printf \"%.2f\", ($gzip_saved / $min_size) * 100}")
    echo ""
    echo "💾 Additional saved space by gzipping: ${gzip_saved} bytes (${gzip_percent}%)"
    echo ""
  else
    echo "❌ Failed to create compressed file $compressed_file"
    exit 1
  fi

else
  echo "❌ Failed to minify $input_file"
  exit 1
fi
