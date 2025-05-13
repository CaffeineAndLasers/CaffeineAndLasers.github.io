---
title: My PhD Explained at 5 Levels
date: 2025-03-23
layout: blogpost.liquid
description: Finally getting round to explaining what I actually research
nesting: "../"
tags:
  - Academia
  - Science
---

**So, what on Earth do I actually work on?** Lets explain it at 5 different levels. 

# 1 Primary School

I use lasers to talk to astronauts

![A digital render of 2 satellites in orbit. A laser beam originates from Earth's surface and is recieved at the first satellite, which relays it to the second](/Assets/IllumaT.png)

Credit: [NASA](https://www.nasa.gov/directorates/somd/space-communications-navigation-program/whats-next-the-future-of-nasas-laser-communications/)


# 2 High School

We use lasers to communicate to communicate with satellites and other things in space. It is like morse code, turning the laser on and off to symbolise "1"s and "0"s. Standard wireless data transfer uses radio, this is what your wifi uses. Moving from radio to laser lets us speed up our data transfer because lasers can blink on/off much faster than radio waves, packing more 1s and 0s into each second.

# 3 Adult

Wireless communication using lasers allows us to achieve far higher data transfer rates than radio. The speed difference is equivalent to moving from copper telephone wires to high-speed optic fiber. My research is taking all the technology from optic fiber networks, and removing the optic fiber. 

The catch, is that turbulence, heat, and air density changes bend and blur the laser, like how a road looks wavy on a hot day. I am working on a way of dealing with this!

![A car shimmers in the heat pouring off the asphalt on the highway leading in to Death Valley National Park](/Assets/HotRoad.png)
Credit: [Dave Gikey, NPR](https://www.hawaiipublicradio.org/2013-07-01/heat-wave-will-bake-southwest-for-most-of-this-week) 

# 4 University Student

When light, like that from a laser beam, passes through the atmosphere it gets distorted, much like seeing sunlight pass through to the bottom of a pool. This makes it more difficult to couple the beam into optic fiber for the receiver, causing signal loss. 

In order to deal with this problem, we use a technique called adaptive optics. This involves measuring the phase of laser beams wavefront, and use deformable mirrors to correct it in real time (about 1,000 corrections a second). I am working on a new type of wavefront sensor for this process. 

![Schematic illustration of a deformable mirror correcting a perturbed wavefront. When a wavefront is perturbed for whatever reason, applying a phase shift with half the amplitude (because the reflection doubles the effect) can correct the wavefront to its original shape before perturbation. In such situations a deformable mirror can be used, although the correction is never perfect because the deformable mirror has a finite number of elements (actuators).](/Assets/Deformable_mirror_correction.png)
Credit: [WikiMedia](https://simple.wikipedia.org/wiki/Adaptive_optics)

# 5 Industry Expert

I am developing a novel wavefront sensor for use in Adaptive Optics assisted Free Space Optical Communications. The sensor I am developing leverages photonic technologies to reduce the size weight and power of traditional WFSing techniques and aims to reduce cost and complexity while improving scalability for satellite-to-ground FSOC links


# 6 Why we care about all this!

It turns out communicating with space is super important for day to day life. You use space technology daily when you use GPS to get around. Its not just that, Earth Observation satellites, (who point their cameras at Earth), are used by meteorologists and climate scientist for weather prediction. We also use them for agricultural monitoring, disaster monitoring, and anything where a birds eye view can help. 

Space science is also progressing advanced bio-technology, where tissues can be grown in a weightless environment, advanced manufacturing, and the potential for future mining operations. 

Currently much of our space technology is bottlenecked by how fast we can downlink data from the satellite. For example, NASAs Hyperspectral Imaging Suite (HISUI) onboard the ISS [generates 300Gb of data every day, but can only downlink 10Gb of it](https://ieeexplore.ieee.org/document/9463743/). The rest is saved on external hard-drives, and physically carried down with the astronauts on their way home. This is clearly not something which will scale, which is why I am working on ways of speeding it up.