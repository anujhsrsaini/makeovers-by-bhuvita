import json
from PIL import Image
import numpy as np

items = json.load(open('public/portfolio/portfolio.json'))
for it in items:
    img_path = 'public/portfolio/' + it['file']
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    # face / eye region (top 20% to 50%)
    eye_crop = im.crop((int(w*0.25), int(h*0.2), int(w*0.75), int(h*0.5)))
    arr_eye = np.array(eye_crop)
    # outfit region (50% to 95%)
    outfit_crop = im.crop((int(w*0.15), int(h*0.5), int(w*0.85), int(h*0.95)))
    arr_outfit = np.array(outfit_crop)
    
    eye_sat = (np.max(arr_eye, axis=2) - np.min(arr_eye, axis=2)).mean()
    outfit_r = arr_outfit[:,:,0].mean()
    outfit_g = arr_outfit[:,:,1].mean()
    outfit_b = arr_outfit[:,:,2].mean()
    outfit_sat = (np.max(arr_outfit, axis=2) - np.min(arr_outfit, axis=2)).mean()
    
    # Yellow/Gold: R high, G high, B lower
    # Green: G high
    # Red/Maroon: R high, G low, B low
    # Pastel/Gown: R~G~B or soft pink/silver/blue
    print(f"ID {it['id']:2d}: curr='{it['category']}' desc='{it['description']}' eye_sat={eye_sat:.1f} outfit_rgb=({outfit_r:.0f},{outfit_g:.0f},{outfit_b:.0f})")
