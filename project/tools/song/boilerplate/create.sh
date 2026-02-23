# !/bin/bash
# -----------------------------------------------------------------------------
#                     Copyright (c) by BookOfFrets 2025
# -----------------------------------------------------------------------------
# @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE
#
# @file create.sh
# @author Alexandru Delegeanu
# @version 1.1
# @description Create song boilerplate
#

# >> Define output path from argument
if [ -z "$1" ] || [ -z "${2:-}" ]; then
  echo "❌ Error: Please provide:"
  echo "   1) Target song directory name"
  echo "   2) Path to index.json file"
  echo "» Usage: ./create.sh <dir-name> <path-to-index.json>"
  exit 1
fi

dir_name="$1"
index_file="$2"

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
output_dir="public/songs/$dir_name"
mkdir -p "$output_dir"
output_file="${output_dir}/config.json"

# Generate JSON boilerplate
cat > "$output_file" <<EOF
{
  "version": "2.0.0",
  "contributors": ["TheAncientOwl"],
  "title": "${title}",
  "artists": [$(echo "$artists" | awk -F',' '{for(i=1;i<=NF;i++){gsub(/^ *| *$/,"",$i); printf "\"%s\"%s", $i, (i==NF?"":", ")}}')],
  "type": ["acoustic"],
  "notes": [],
  "capo": ${capo},
  "chordIDs": [],
  "strumms": [],
  "sections": {},
  "order": [],
  "lyrics": false,
  "res": ${res_json}
}
EOF

echo "✅ Boilerplate created at: $output_file"

index_entry="{
  \"title\": \"${title}\",
  \"artists\": [$(echo "$artists" | awk -F',' '{for(i=1;i<=NF;i++){gsub(/^ *| *$/,"",$i); printf "\"%s\"%s", $i, (i==NF?"":", ")}}')],
  \"directory\": \"${dir_name}\",
  \"type\": [\"acoustic\"],
  \"chordIDs\": []
}"

echo "📘 Appending entry to index.json: ${index_file}"

if [ ! -f "$index_file" ]; then
  echo "❌ Error: index.json not found at ${index_file}"
  exit 1
fi

# Use jq to safely append into:
# {
#   "index": [ ... ]
# }

if ! command -v jq >/dev/null 2>&1; then
  echo "❌ Error: jq is required to modify index.json safely."
  exit 1
fi

tmp_file="$(mktemp)"

jq \
  --arg title "$title" \
  --arg dir "$dir_name" \
  --arg artists_raw "$artists" \
  '
  .index += [{
    title: $title,
    artists: ($artists_raw | split(",") | map(gsub("^\\s+|\\s+$"; ""))),
    directory: $dir,
    type: ["acoustic"],
    chordIDs: []
  }]
  ' \
  "$index_file" > "$tmp_file"

mv "$tmp_file" "$index_file"

echo "✅ Entry appended to index.json"
