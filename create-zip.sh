#!/bin/bash
# Run this script from the six-continents folder to create the final ZIP
cd "$(dirname "$0")"
zip -r ../six-continents-final.zip . \
  -x "./__pycache__/*" \
  -x "./node_modules/*" \
  -x "./.arena/*"
echo "Created: $(ls -lh ../six-continents-final.zip | awk '{print $5}')"
echo "Files: $(unzip -l ../six-continents-final.zip | tail -1)"
