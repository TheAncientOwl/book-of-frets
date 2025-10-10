# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file create.sh
# @author Alexandru Delegeanu
# @version 0.2
# @description Create song boilerplate
#

# >> Define output path from argument
if [ -z "$1" ]; then
  echo "❌ Error: Please provide a target directory as the first argument."
  echo "» Usage: ./create.sh /path/to/song/folder"
  exit 1
fi

# >> Inputs
read -p "» Enter song title: " title
read -p "» Enter artist(s) (comma separated if multiple): " artists
read -p "» Enter capo (number): " capo

echo ""
echo "⏳ Generating..."

res_json='[
    {
      "alias": "",
      "author": "GuitarZero2Hero ~ YouTube",
      "link": ""
    },
    {
      "alias": "",
      "author": "GuitarZero2Hero Express ~ YouTube",
      "link": ""
    }
  ]'

# >> Define output directory and filename
output_dir="public/songs/$1"
mkdir -p "$output_dir"
output_file="${output_dir}/config.json"

# Generate JSON boilerplate
cat > "$output_file" <<EOF
{
  "version": "0.1.0",
  "contributors": ["TheAncientOwl"],
  "title": "${title}",
  "artists": [$(echo "$artists" | awk -F',' '{for(i=1;i<=NF;i++){gsub(/^ *| *$/,"",$i); printf "\"%s\"%s", $i, (i==NF?"":", ")}}')],
  "type": ["acoustic"],
  "notes": [],
  "capo": ${capo},
  "chordIDs": [],
  "strums": [],
  "segments": {},
  "order": [],
  "res": ${res_json}
}
EOF

echo "✅ Boilerplate created at: $output_file"

echo "📘 Suggested index.json entry:"
echo ""
echo "{
  \"title\": \"${title}\",
  \"artists\": [$(echo "$artists" | awk -F',' '{for(i=1;i<=NF;i++){gsub(/^ *| *$/,"",$i); printf "\"%s\"%s", $i, (i==NF?"":", ")}}')],
  \"directory\": \"${1}\",
  \"type\": [\"acoustic\"],
  \"chordIDs\": []
},"
