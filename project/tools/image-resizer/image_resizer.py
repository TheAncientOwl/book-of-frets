"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2025
---------------------------------------------------------------------------
 @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file image_resizer.py
 @author Alexandru Delegeanu
 @version 1.0
 @description Resize given image
"""


from PIL import Image
import sys
import os

if len(sys.argv) < 4:
    print("Usage: python resize.py <input_path> <width> <height>")
    sys.exit(1)

input_path = sys.argv[1]
width = int(sys.argv[2])
height = int(sys.argv[3])

# Build output filename: e.g. image-80x80.png
root, ext = os.path.splitext(input_path)
output_path = f"{root}-{width}x{height}{ext}"

with Image.open(input_path) as img:
    resized = img.resize((width, height), Image.LANCZOS)
    resized.save(output_path)

print(f"Resized: {os.path.basename(input_path)} -> {os.path.basename(output_path)} ({width}x{height})")
