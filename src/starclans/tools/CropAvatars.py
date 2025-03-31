from PIL import Image
import os
from pathlib import Path

# Get the script's directory and set up paths
script_dir = Path(__file__).parent
source_image = script_dir / "source_avatars" / "source_grid.png"
output_dir = Path("public/assets/starclans/avatars")  # Updated output path

# Load the image
img = Image.open(source_image)

# Grid setup (2x2)
rows, cols = 2, 2
avatar_width = img.width // cols
avatar_height = img.height // rows

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Find the highest existing avatar number
existing_avatars = [f for f in os.listdir(output_dir) if f.startswith('avatar_') and f.endswith('.png')]
highest_num = -1
for avatar in existing_avatars:
    try:
        num = int(avatar.replace('avatar_', '').replace('.png', ''))
        highest_num = max(highest_num, num)
    except ValueError:
        continue

# Start numbering from the next available number
next_num = highest_num + 1

# Crop each avatar and save
for row in range(rows):
    for col in range(cols):
        left = col * avatar_width
        upper = row * avatar_height
        right = left + avatar_width
        lower = upper + avatar_height
        cropped = img.crop((left, upper, right, lower))
        filename = output_dir / f"avatar_{next_num}.png"
        cropped.save(filename)
        next_num += 1

print(f"Avatars cropped and saved to {output_dir}!")
