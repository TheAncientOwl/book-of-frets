# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file run.sh
# @author Alexandru Delegeanu
# @version 0.1
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
else
  echo "❌ Failed to minify $input_file"
  exit 1
fi
