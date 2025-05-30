---
title: Imaging Photonic Crystal Fibers and Measuring Their Geometries
date: 2025-05-30
description: "Adding some text here so I dont obviously break the yaml and description. yapp yapp yap. Heedy howedy ass # 2 Summary Results"
layout: note.liquid
---

---
date: 2025-05-29
parent:
  - "[[LF-PCF Bench Test]]"
  - "[[Photonic Crystal Fibres|PCF]]"
  - "[[LMA20]]"
  - "[[LMA25]]"
  - "[[ESM12B]]"
aliases: 
tags: 
UFI: 20250529T154800
---
# 1 Test title

Adding some text here so I dont obviously break the yaml and description. yapp yapp yap. Heedy howedy ass
# 2 Summary Results


| Fiber                          | [[LMA20]] | [[LMA25]] | [[ESM12B]] |
| ------------------------------ | --------- | --------- | ---------- |
| Hole RADIUS ($\micro m$)       | 5.7       | 7.7       | 3.7        |
| Hole Pitch ($\micro m$)        | 10.5      | 14.2      | 6.7        |
| Measured Diameter ($\micro m$) | 225       | 245.6     | 134        |




---
# 3 Process

## 3.1 Pixel Scale  
• The pixel scale was computed in using a 100$\micro m$ piano ware as calibration. It was found to be **0.60 µm/pixel**.

## 3.2 Pre-processing & Mask Extraction  
First we masked the image 

For each fiber (LMA20, ESM12B, LMA25) you:  
1. Loaded the grayscale image with `cv2.imread`.  
2. Applied a heavy Gaussian blur (`cv2.GaussianBlur`) and simple threshold (`cv2.threshold`).  
3. Found contours (`cv2.findContours`) and fit a circle (`cv2.minEnclosingCircle`) to the largest contour.  
4. Created a binary mask (circle) of the cladding.  

## 3.3 Hotspot Detection  

Once we were happy with the mask we wanted to find the holes automatically.

• Invert the image (`255 - image`) then zero out everything outside the circular mask.  This is so that the holes are bright spots
• Detect local maxima with `skimage.feature.peak_local_maxima`.  
• Filter peaks to those within a reduced ROI around the fiber core (≈ 0.8–0.85 × cladding radius). This was necessary since often the edges of the fiber were quite hot

## 3.4 Radial Profiling  

Once we had found all of the holes, we wanted to estimate their size. So we go to the center of each spot and get the mean intensity as a function of radius from the center of the hotspot

• Defined a helper function `radial_profile` to compute mean intensity vs. radius for any center.  
• For each hotspot, extracted a 1D profile up to `max_radius=100` pixels (~60 µm).  
• Stacked all profiles into arrays (`stacked_radial_profiles_lma20`, etc.) for each fiber type.

## 3.5 Radius & Pitch Extraction  

After getting the radial profile, we can assume the first local minima is the edge of the hoe, and the first local max is the center of the next

1. **Hole radius**: For each profile, find the first minima in intensity (`find_peaks(-profile)`). Collect these into `first_minima_list_*` and compute the median → `median_first_minima_*`.  
2. **Pitch**: Find the next maxima after the first minima → `median_second_maxima_*`.  
3. Convert both metrics to micrometers by multiplying by `pixel_size = 0.6 µm`.  
4. Print out:  
   - Cladding diameter = 2 × `radius_*` (pixels and µm)  
   - Estimated hole radius (`median_first_minima_* × pixel_size`)  
   - Estimated hole pitch (`median_second_maxima_* × pixel_size`)

# 4 Results

## 4.1 LMA20

### 4.1.1 Hotspot detection
![](cc71b9a24c4586360308375134dbe845.png)

### 4.1.2 Calculating Feature Size

![](ece6a4be5fb5abe8d691823e77ca6005.png)
## 4.2 LMA25

### 4.2.1 Hotspot detection
![](a2cc96f23ec6399afa4acab25d1ac5e3.png)

### 4.2.2 Calculating Feature Size

![](d62bd299231d132bffff29a539240617.png)
## 4.3 ESM12B
### 4.3.1 Hotspot detection
![](a822fb8d37ccad331793d4d2f07fa944.png)
### 4.3.2 Calculating Feature Size

![](24b08793732a0072b6c3e475a9a6363a.png)