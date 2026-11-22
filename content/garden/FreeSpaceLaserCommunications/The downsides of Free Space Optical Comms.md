---
title: The Downsides of Free Space Optical Comms
date: 2026-11-21
lastEdited: "2026-11-23"
---

# The Downsides of Free Space Optical Comms

In the last post, we discussed [why optical links can send data much faster than radio](/garden/FreeSpaceLaserCommunications/Why%20Optical%20Increases%20Datarates.html). That leaves a question: why are spacecraft still launching with big hulking antennas?

Well, it hurts me to admit this, but optics can't do everything. There are a few fundamental issues with optics that we can't get around.

## Pointing and tracking

The first thing you might be thinking is, “Isn't it really hard to aim the laser?” It is, but the engineers are really good. With some very smart algorithms and very precise (and expensive) telescope mounts, we can aim our laser accurately over hundreds of thousands of kilometres. Great! There's a catch, though: how do we coordinate the pointing and tracking dance before we've established communications? This is where radio comes in. Radio is great: you barely need to aim it. We can use radio to coordinate the pointing and tracking until the optical link is locked on.

## Clouds and geographic diversity

The other thing we need to discuss is clouds. The god damn clouds.

![A Simpsons newspaper headline reads “Old Man Yells at Cloud.”](/Assets/FreeSpaceLaserCommunications/old-man-yells-at-cloud.png)

While clear air is transparent at the near-infrared wavelengths we use, clouds are made of water droplets and ice crystals that scatter the light. So if a cloud comes between our ground station and our spacecraft, we're boned.

We can't do much about the clouds at any one site, but we can work around them with **geographic diversity**: we put ground stations fucking everywhere and hope that one of them isn't clouded out. My PhD “big brother” (same supervisor, but he graduated before me) did a lot of work on this in [Availability, outage, and capacity of spatially correlated, Australasian free-space optical networks](https://opg.optica.org/jocn/abstract.cfm?uri=jocn-15-7-415) (or the [non-paywalled version](https://arxiv.org/abs/2211.09248)). In that study, with just three sites, at least one had clear skies 69% of the time. That percentage climbs quickly as we add more sites.

![Map showing how often skies are clear for optical links across Australia and New Zealand.](/Assets/FreeSpaceLaserCommunications/australasian-optical-link-availability.png)

## Atmospheric turbulence

And finally, even if you can point at the spacecraft accurately and there are no clouds, your link can still be disrupted by atmospheric turbulence.

![Heat shimmer distorts the view of a road in the distance.](/Assets/FreeSpaceLaserCommunications/road-heat-shimmer.png)  
*Credit: [Why does the air shimmer in the summer? | TÜV NORD](https://www.tuev-nord.de/en/knowledge/explore/why-does-the-air-shimmer-in-the-summer/).*

The air between us and the spacecraft is moving. As pockets of air at different temperatures move around, they distort our laser beam, much like hot air distorts the view of a distant road. That can reduce the power reaching our detector and force us to lower the data rate. We discussed what sets that limit in [Why Optical Links Increase Data Rates](/garden/FreeSpaceLaserCommunications/Why%20Optical%20Increases%20Datarates.html).

Fortunately, we can copy the astronomers' homework here. They've been working on this for decades using a technique known as [adaptive optics](/blogs/phdAt5Levels.html), which measures and corrects those distortions in real time. A full explanation will come in a future entry.

![Cover of Discoveries at ESO, with an illustration of a wavy surface beneath a starry sky.](/Assets/FreeSpaceLaserCommunications/discoveries-at-eso.jpg)
