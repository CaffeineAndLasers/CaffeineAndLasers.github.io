---
title: How to build a Shack-Hartmann Wavefront Sensor
date: 2026-03-12
updated: 2026-03-12
description: "A short buildlog / tutorial for how to build a Shack Hartmann Wavefront Sensor"
layout: blogpost.liquid
---

## Introduction

Earlier this month, I found myself on a side quest to build a Shack-Hartmann Wavefront Sensor (SH-WFS) to act as a scoring WFS for my experimental WFS. While conceptually simple to construct, I never saw any concrete step-by-step instructions for how to build one on the internet. So here is my contribution to the world's knowledge. 

A SH-WFS is quite possibly the simplest method for measuring the shape of a wavefront (i.e., its phase as a function of its position in the pupil). 

Its mode of operation is quite simple. Using an array of lenses (a microlens array), a corresponding array of spots will appear on the camera. As the shape of the wavefront changes, the spots will move corresponding to the slopes. Measuring the movement of the spots, we can reconstruct the slope of the local wavefront. More information can be found at [RP Photonics](https://www.rp-photonics.com/shack_hartmann_wavefront_sensors.html) or [Wikipedia](https://en.wikipedia.org/wiki/Shack%E2%80%93Hartmann_wavefront_sensor) 

<img src="../Assets/shwfs_diagram.png" alt="Diagram for the operation of a SHWFS" style="display: block; margin: 1rem auto; width: min(30%, 760px); height: auto;" />

Source: [Wikimedia](https://en.wikipedia.org/wiki/Shack%E2%80%93Hartmann_wavefront_sensor#/media/File:Shack_Hartmann_WFS_lensletarray.svg)

In addition to the microlens array and camera, you will also need a couple of optical relays. 

The rest of this post walks through the build process, from selecting components through alignment. I've organized it as a series of steps, though in practice you'll likely bounce between them as your constraints evolve.

# Build Process 

## Step 1: Setup a Kanban Board and collect your constraints

The free parameters you will be balancing are:

- Wavelength
- Speed
- Spatial Resolution
- Angular Range and Resolution
- Cost

I call out the difference between spatial resolution, which is how many spots you measure on the wavefront, and angular resolution, which is how precisely you can measure the slope at that point. 

In my experiment, I want to operate at 1550nm. I do not need a high-speed camera since I am not doing any closed loop AO. I want to be able to measure the first 16 zernike modes, so a 5 x 5 grid would be more than sufficient.

I didn't have any extra funding to build this arm of my experiment, so I am building it mainly out of equipment we already have access to in the lab without buying anything new. This is the biggest constraint on my design. 

## Step 2: Completely Ignore the Kanban board

## Step 3: Select Your MLA and Camera

These will be the primary variables driving the rest of your design. The camera will probably be the most expensive component so starting with that you will determine the:

- Wavelength
- Maximum Speed
- Pixel Resolution. (This will drive the angular and spatial resolutions available to you.)

Once you've selected a camera (or created a shortlist), consider the microlens array; here your key parameters are

- Lenslet pitch (this is roughly the same as the lenslet diameter most of the time)
- Effective Focal Length

You should also try and match your antireflective coating to your wavelength.

In my case, I have access to a [Thorlabs MLA300-14AR-M](https://www.thorlabs.com/item/MLA300-14AR-M) microlens array and an InGaAs camera with 656 × 520 pixels (0.30 MP) and a pixel size of 5 $\micro m$. While the AR coating doesn't match the wavelength, I determined that free is better than not free, and will use it anyway. 

Before you commit to anything, you should check that your spots will actually be resolvable. The spot size is determined by the Airy disk:

$$
D \approx 2.44 \times \lambda \times F/\#
$$

The F-Number for my microlens array is: $14.6mm / 300\micro m = 48.67$, thus the spot size is: $184\micro m$ in the MLA's image plane. It will then be magnified by the relay (explained in the next step), so the spot size on the camera is:

$$
D_\text{Spot On Camera} \approx 2.44 \times M \times \lambda \times F/\#
$$

Plug your numbers in here to get an idea of how large each spot will be on the camera. You will need to adjust the number of subapertures you plan on illuminating to make sure you can fit all the spots on the camera with sufficient spacing between them.

<div class="calc-callout" data-calc="airy">
	<h4>Calculator: Spot Size</h4>
	<div class="calc-grid">
		<label>Wavelength lambda (um)
			<input type="number" step="0.001" data-in="lambda" value="1.55">
		</label>
		<label>MLA focal length f (mm)
			<input type="number" step="0.01" data-in="f-mm" value="14.6">
		</label>
		<label>Microlens diameter d (um)
			<input type="number" step="1" data-in="diam-um" value="300">
		</label>
		<label>Relay magnification M
			<input type="number" step="0.01" data-in="mag" value="1">
		</label>
	</div>
	<div class="calc-output" data-out="main"></div>
	<div class="calc-suboutput" data-out="sub"></div>
</div>


## Step 4: Design a relay between the MLA and Camera

The effective focal length of the MLA almost certainly won't match the working distance of the camera. The camera C-Mount spec puts the sensor 17.526 mm past the mounting point, while the MLA I selected has a 14.6mm working distance. This means that even if I mount the MLA right on the camera, it still won't focus. See the diagram below on the left.

<img src="../Assets/20260312_2.svg" alt="Relay requirement between MLA and camera" style="display: block; margin: 1rem auto; width: min(100%, 900px); height: auto;" />


This means that we will need to use a 4F relay to move the image plane of the MLA onto the camera's sensor (See the diagram on the right). You may also use this step to perform some magnification. This may provide extra angular resolution at the cost of larger spots and less spatial resolution.

Using some basic trigonometry we can determine the angular resolution.

<img src="../Assets/a4adf0545e4fe45704c4e9b233992fbc.svg" alt="basic diagram of the trigonometry of the situation" style="display: block; margin: 1rem auto; width: min(50%, 900px); height: auto;" />



If your pixel size is $p$ and you have magnification $M$ between the MLA and camera, the effective pixel size in the MLA's image plane is $p' = p/M$. Then your angular resolution is:

$$
\delta \theta = \arctan(p'/f) \approx p / (Mf)
$$

<div class="calc-callout" data-calc="angular">
	<h4>Calculator: Angular Resolution</h4>
	<div class="calc-grid">
		<label>Pixel size p (um)
			<input type="number" step="0.01" data-in="pixel" value="3.45">
		</label>
		<label>Relay magnification M
			<input type="number" step="0.01" data-in="mag" value="1">
		</label>
		<label>MLA focal length f (mm)
			<input type="number" step="0.01" data-in="f" value="14.6">
		</label>
	</div>
	<div class="calc-output" data-out="main"></div>
	<div class="calc-suboutput" data-out="sub"></div>
</div>

In my case, I wanted approximately 1x magnification here. I happened to find a 60mm and a 75mm lens making a 1.25X magnification. This is close enough for my application.

## Step 5: Design a relay between your image plane and your MLA

Whatever you are imaging, e.g. a DM, you need its image on the Microlens array. This calls for another 4F relay. 

I will take a minute now to discuss how to design both relays. Your object (e.g. DM) and Camera Sensor likely are not the same size. I am trying to image a 10mm DM onto a camera sensor 2.5mm tall. So I will need to demagnify my beam by 4x at some point in the system. 

The question is whether to do this demagnification BEFORE the MLA, or AFTER. This boils down to how many sub-apertures you want. A larger beam at the MLA means you image more sub apertures. Determining the optimal number of sub apertures is a slightly involved question. While the naive strategy may be to illuminate as many sub apertures as possible, this has a couple of disadvantages. The signal to noise of each subaperture is lowered, which will degrade performance in a intensity limited situation. The number of pixels per sub aperture is also reduced, reducing the angular resolution for each subaperture. Finally, if you are designing a closed loop AO system, you want to match the number of subapertures to the number of DM actuators in order to create a square interaction matrix.

In my case, I decided to shrink my beam before the MLA so I am hitting a smaller number of apertures.

The magnification of a relay is simply proportional to the ratio of the lenses focal lengths:

$$ M = f_1 / f_2 $$

So if you know roughly how much you need to shrink or enlarge the beam, you can work backwards into a sensible lens pair:

<div class="calc-callout" data-calc="magnification">
	<h4>Calculator: Relay Magnification</h4>
	<div class="calc-grid">
		<label>f1 (mm)
			<input type="number" step="0.1" data-in="f1" value="50">
		</label>
		<label>f2 (mm)
			<input type="number" step="0.1" data-in="f2" value="200">
		</label>
	</div>
	<div class="calc-output" data-out="main"></div>
	<div class="calc-suboutput" data-out="sub"></div>
</div>

In order to get an approximate 4X magnification factor, I grabbed a 200mm and 40mm lens. This 5X magnification will be demagnified by 1.25X by the other relay leading to a 4X magnification factor overall. 

## Step 6: Build and align the system

Easier said than done. If your system includes both relays as mentioned, it will look something like this (neglecting the necessary beam splitters, fold mirrors, etc.). I generally try to move from the camera outward to align optics.

<img src= "../Assets/034b397f6e19c78ca77baa646a21d371.svg" alt="Diagram of the setup described above. It goes from the DM through L1, L2, MLA, L3 and L4 all the way to the camera. The rays are traced through a single microlens" style="display: block; margin: 1rem auto; width: min(100%, 760px); height: auto;" />

This looks like following:

1. Align L4 onto the camera with a laser light source, adjust the length to minimize the size of the focal point onto the camera. 
2. Add in L3, adjusting the length to get the spots back in focus, with the appropriate magnification. 
3. Add in the MLA, adjust until all spots are in focus. 
4. Add in the object you are trying to measure the phase of. 
5. Add in L1 and L2, adjust the lengths until the object conjugate is found. I did this by applying random phase deformation, and verifying that the spots MOVED, but had **no change in intensity**.

Once you have the MLA aligned it should look something like the image below. With my final setup to the right.

<div style="display: flex; gap: 1.5rem; justify-content: center; align-items: flex-start; flex-wrap: wrap; margin: 1rem auto;">
  <img src="../Assets/MLA_Spots.png" alt="Black and white image of several white spots arranged in a grid. It is moderately rotated" style="width: 45%; min-width: 280px; height: auto;" />
  <img src="../Assets/SHWFS_annotated.png" alt="Annotated photo of my setup. The system described above uses a pelicle beam splitter" style="width: 45%; min-width: 280px; height: auto;" />
</div>

**NOTE:** See how there are gridlines coming out from each spot, turns out I was over-exposing the camera when I captured these images. Try not to do that. Also try to rotate your optics so it isn't all off rotation like mine.

Getting all of these distances correct is easier if you model the system in Zemax or Optiland first. This allows you to understand how sensitive each distance is, and which can be adjusted to compensate for errors in others. For example, in my particular setup, the distance between L1 and L2 was very forgiving, but the distance between the MLA and L1 was very tight. 

**Bonus Tip:** For components in lens tubes, you can fix the spacing to ~0.2mm tolerance with 3D printed spacers slipped inside the tube. 

## Step 7: Design your software

You will need your algorithm to:
- Find spot locations using a centroiding algorithm.
- Measure their movement relative to some reference
- Manage which sub-apertures are "active".

I would love to share my code directly here, but unfortunately I am not a very good developer, and my code is very tightly bound to other sections of my codebase. Let me run you through the basic steps though. 

1. Stream and capture from your camera
2. Segment the frame into subaperture regions. 
3. Mask and ignore inactive subapertures. (Not bright enough, blocked by the pupil, etc)
4. Centroid algorithm (I find a center of mass centroiding works well enough)
5. Calculate movement of centroids in micrometers, and use trigonometry to convert to angle in radians. 

In my experiance python with OpenCV can handle all this for "Real Time" human interaction. However if you are actually planning on building a Closed Loop AO system I would consider a lower level language and perhaps getting somone who actually knows what they are doing to write performant code. 


## Wrap-up

At this point you should have:

- A camera and MLA pair that actually give you resolvable spots
- A relay between the MLA and camera that gets the spots onto the sensor with the angular resolution you want
- A relay between your object and the MLA that gives you a sensible number of illuminated sub-apertures
- Software to run it all



<script>
(function() {
	function round(value, digits) {
		var p = Math.pow(10, digits || 3);
		return Math.round(value * p) / p;
	}

	function toNumber(input) {
		var v = parseFloat(input.value);
		return Number.isFinite(v) ? v : NaN;
	}

	function updateAiry(box) {
		var lambdaUm = toNumber(box.querySelector('[data-in="lambda"]'));
		var fMm = toNumber(box.querySelector('[data-in="f-mm"]'));
		var diamUm = toNumber(box.querySelector('[data-in="diam-um"]'));
		var mag = toNumber(box.querySelector('[data-in="mag"]'));

		var outMain = box.querySelector('[data-out="main"]');
		var outSub = box.querySelector('[data-out="sub"]');

		if (!Number.isFinite(lambdaUm) || !Number.isFinite(fMm) || !Number.isFinite(diamUm) || !Number.isFinite(mag) || fMm <= 0 || diamUm <= 0 || mag <= 0) {
			outMain.textContent = 'Enter valid positive values.';
			outSub.textContent = '';
			return;
		}

		var fnum = (fMm * 1000) / diamUm;

		var dMlaUm = 2.44 * lambdaUm * fnum;
		var dCamUm = dMlaUm * mag;

		outMain.textContent = 'Spot on camera: ' + round(dCamUm, 2) + ' um (F-number: ' + round(fnum, 2) + ')';
		outSub.textContent = 'Spot at MLA plane: ' + round(dMlaUm, 2) + ' um';
	}

	function updateAngular(box) {
		var pUm = toNumber(box.querySelector('[data-in="pixel"]'));
		var mag = toNumber(box.querySelector('[data-in="mag"]'));
		var fMm = toNumber(box.querySelector('[data-in="f"]'));

		var outMain = box.querySelector('[data-out="main"]');
		var outSub = box.querySelector('[data-out="sub"]');

		if (!Number.isFinite(pUm) || !Number.isFinite(mag) || !Number.isFinite(fMm) || mag <= 0 || fMm <= 0) {
			outMain.textContent = 'Enter valid positive values.';
			outSub.textContent = '';
			return;
		}

		var pPrimeMm = (pUm / 1000) / mag;
		var thetaRad = Math.atan(pPrimeMm / fMm);
		var thetaUrad = thetaRad * 1e6;
		var thetaArcsec = thetaRad * 206264.806;

		outMain.textContent = 'Angular resolution: ' + round(thetaUrad, 2) + ' urad';
		outSub.textContent = 'Approx ' + round(thetaArcsec, 2) + ' arcsec';
	}

	function updateMagnification(box) {
		var f1 = toNumber(box.querySelector('[data-in="f1"]'));
		var f2 = toNumber(box.querySelector('[data-in="f2"]'));

		var outMain = box.querySelector('[data-out="main"]');
		var outSub = box.querySelector('[data-out="sub"]');

		if (!Number.isFinite(f1) || !Number.isFinite(f2) || f1 <= 0 || f2 <= 0) {
			outMain.textContent = 'Enter valid positive values.';
			outSub.textContent = '';
			return;
		}

		var m = f1 / f2;
		outMain.textContent = 'Relay magnification M = ' + round(m, 4);
		outSub.textContent = m < 1
			? 'Demagnification factor: ' + round(1 / m, 3) + 'x'
			: 'Magnification factor: ' + round(m, 3) + 'x';
	}

	function bindCalc(box, updateFn) {
		var inputs = box.querySelectorAll('input');
		inputs.forEach(function(input) {
			input.addEventListener('input', function() {
				updateFn(box);
			});
		});
		updateFn(box);
	}

	function initCalculationCallouts() {
		document.querySelectorAll('.calc-callout[data-calc="airy"]').forEach(function(box) {
			bindCalc(box, updateAiry);
		});
		document.querySelectorAll('.calc-callout[data-calc="angular"]').forEach(function(box) {
			bindCalc(box, updateAngular);
		});
		document.querySelectorAll('.calc-callout[data-calc="magnification"]').forEach(function(box) {
			bindCalc(box, updateMagnification);
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initCalculationCallouts);
	} else {
		initCalculationCallouts();
	}
})();
</script>




