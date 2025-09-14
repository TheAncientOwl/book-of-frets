"""
---------------------------------------------------------------------------
                    Copyright (c) by BookOfFrets 2025
---------------------------------------------------------------------------
 @license https://github.com/TheAncientOwl/book-of-frets/blob/main/LICENSE

 @file webpify.py
 @author Alexandru Delegeanu
 @version 0.1
 @description Convert source image to webp
"""

from PIL import Image
import os
import sys

input_path = sys.argv[1]
output_path = os.path.splitext(input_path)[0] + ".webp"

with Image.open(input_path) as img:
    img.save(output_path, "WEBP", quality=100)

print(f"Converted: {os.path.basename(input_path)} -> {os.path.basename(output_path)}")
