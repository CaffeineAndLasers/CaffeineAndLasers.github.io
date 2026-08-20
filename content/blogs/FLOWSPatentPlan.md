---
title: FLOWS Patent Plan
date: 2026-08-20
description: "- [ ] Figure out what info actually is required"
layout: blogpost.liquid
---

- [ ] Figure out what info actually is required

> [!EMAIL]- [[2026-02-16]] Francis
> Just keep collecting any background papers similar so we have ab it of an evidence base to work with. The more awareness you have about patents and the process the better prepared you can be - see if there are any guides or training modules that you can do.

> [!EMAIL]- [[2026-03-11]] Me
> Hey, Francis.
> Something that just popped into my mind. 
> 
> I'm going to have to start writing the conference proceeding for Copenhagen sometime soon. (Assuming I am accepted on when they send emails out on Monday lol) 
> 
> This might get a little hairy RE IP issues if the notice of intent to submit patent for the reconstruction algorithm hasn't been submitted yet.
>
> Something we should chat about tomorrow.
> 
> Cheers
> Cam

>[!Email]-  [[2026-03-11]] - Francis
>Hi Cameron,
>
>I’m on campus tomorrow - we can chat on Friday. The main thing before we go to the commercialization office for the patent is to make sure there is something provably novel worth protecting with a patent. There is quite a bit of cost associated with the process so they will be asking for that kind of information. 
>
>Thanks!
>Francis


## 0.1 What Previously Existed

Previous work, [[@valenteWavefrontSensingUsing2015]], proposed using LF-PCF for wavefront sensing, demonstrating sensitivity to the first 5 modes only, without building a reconstruction algorithm. 

AI/ML applications ARE, all over the research space, but has never been applied to Coupled waveguide arrays.

Phase Diversity has not been applied to PCF / Coupled waveguide arrays

Phase Diversity + ML was seen in [[@orthFastSinglePixel2024]] 

It is the combination of:
- PCF / CWA
- ML
- Phase Diversity
Which makes our work unique


## 0.2 This Work

There are two key techniques proposed in my work which elevates the performance of the sensor. 

- **Phase Diversity** - Input phase modulation
	- Multiple known phase offsets applied.
	- Measurements stacked into augmented vector.
- **Multi-layer Perception (MLP) based Neural Network Reconstruction Algorithm.** 
	- Wide, shallow MLP (2 × 2000 neurons).
	- Width captures high-dimensional combinatorial interactions.
	- Shallow design reduces latency.

## 0.3 Why this works

### 0.3.1 Phase Diversity
- Breaks symmetry in intensity response
- Removes non-uniqueness in inversion
- Keeps sensor operating in high-sensitivity regime
- Increases measurement rank
### 0.3.2 MLP Reconstruction Algo
From linear approximation → learned nonlinear inversion of the full sensor physics.

## 0.4 What we can NOT claim
- Anything about the hardware of LF-PCF, 
- The theoretical framework



# 1 See Also
- [[Australian Patent]]
- [[Australian Provisional Patent Application]]