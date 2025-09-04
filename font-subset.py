#!/usr/bin/env -S uv run --script
# 
# /// script
# requires-python = ">=3.13"
# dependencies = [
#     "brotli",
#     "fonttools",
#     "ugrapheme",
# ]
# ///

import glob
import os
import sys
from ugrapheme import grapheme_iter
from fontTools import subset

if len(sys.argv) == 1:
    print("Usage: font-subset.py glob/to/content/*.md list.woff2 of.woff2 fonts.woff2")
    exit(1)

chars = set()
for file_name in glob.glob(sys.argv[1]):
    file = open(file_name)
    text = file.read()
    for char in grapheme_iter(text):
        chars.add(char)

for font_file in sys.argv[2:]:
    build_file=f"{font_file}.tmp-build"
    if not os.path.exists(font_file):
        print(f"error: {font_file} does not exists")
        exit(2)
    if os.path.exists(build_file):
        print(f"error: {build_file} already exists")
        exit(3)
    args = [
        font_file,
        f"--text={''.join(chars)}",
        "--no-layout-closure",
        f"--output-file={build_file}",
        "--flavor=woff2",
    ]
    subset.main(args)
    os.replace(build_file,font_file)
    print(f"Subset modified for {font_file}")

