---
title: Why do we need all the data in space anyway
date: 2026-11-05
lastEdited: "2026-11-20"
---

# Why do we need all the data in space anyway

We are putting more satellites into space every day. The current number is:

<a href="https://azmth.space/data">
  <img
    src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fazmth.space%2Fstats.json&amp;query=%24.total&amp;label=Active%20satellites&amp;color=9b7ad4&amp;labelColor=292a3e&amp;style=for-the-badge"
    alt="Active satellites"
    width="300">
</a>
<a href="https://azmth.space/data">
  <img
    src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fazmth.space%2Fstats.json&amp;query=%24.data_as_of&amp;label=Data%20updated&amp;color=9b7ad4&amp;labelColor=292a3e&amp;style=for-the-badge"
    alt="Satellite data last updated"
    width="350">
</a>

And this is just the **live** satellites. Dead space junk is a whole other topic: See [Kessler Syndrome](https://en.wikipedia.org/wiki/Kessler_syndrome).

Now most of these satellites are either for observations, or communication. They:

- They yell out the time and their location for navigation
- They point their sensors outwards for astronomy
- They point their sensors inwards for Earth observation
- Or they relay messages between eachother and Earth. 

Between all this they generate a LOT of data. So much data that we can't download it all. On this page I want to give a brief tour of the different things we are doing in space, and why we need so much data off of them. 

## Earth Observation

Let me talk about a small handful of the crazy applications we are already doing to use space to improve life on Earth. 

### Fire Monitoring

As an Australian, I have to talk about fire management, because we are all traumatised by the Black Summer bushfires of 2019/20 (and the 2009 Black Saturday bushfires, and the 2003 Canberra bushfires, and the 1938 Ash Wednesday bushfires ....)

Turns out, there is a lot we can do from space to predict, monitor and track, and prevent wildfires. 

[FireSat by Earthfire Alliance](https://earthfirealliance.org/about-firesat/) is a multispectral imaging system (they measure visible and infrared) made up of a constellation of satellites which have an 80 m average resolution and as low as 1 hour between passes, which allows near real-time tracking of fires.  

![Six views of a fire in red and infrared bands, revealing hot spots through smoke](/Assets/FreeSpaceLaserCommunications/Pasted%20image%2020261105151140.png)  
*FireSat's multispectral imaging, with red and 5 infrared cameras.* 

In order to prevent fires, the Australian National University (My Uni) is working on the [OzFuel-1 Mission](https://inspace.anu.edu.au/missions/ozfuel-1-satellite-payload-mission) which is an Earth observation satellite specifically designed to measure how much Eucalyptus trees there are in an area, and how dry they are. By tracking vegetation density and flammability, we can better direct hazard reduction burns and other risk mitigation strategies to address the fires before they start. 

Finally, we need to talk about the [NASA **Fire Information for Resource Management System** (**FIRMS**)](https://firms.modaps.eosdis.nasa.gov/map/#d:24hrs;@0.0,0.0,3.0z) which tracks active fire locations with satellites that pass over the same location 12 times a day with about a 1 km^2 resolution. Each satellite tracks "thermal anomalies", i.e. really hot bits on the planet. 

You can go to the site right now, and you might notice that there happens to be a lot of these thermal anomalies in the Ukraine - Russia border region (assuming you are reading in 2026), how curious. 

![FIRMS map of Europe and surrounding regions with thermal anomalies marked in red](/Assets/FreeSpaceLaserCommunications/Pasted%20image%2020261105152006.png)  
*Screenshot from FIRMS on 2026-November-05*

### Military

Yes, while I want to focus on the good things for the planet, we cannot ignore the military aspects. Satellite imaging has been invaluable for both Ukrainian defence and the Russian invaders. In addition to the very important civilian aspects of FIRMS, you can also use it to track which Russian refineries seem to be particularly susceptible to "smoking accidents". These days, satellite imaging is ubiquitious, and even medium powers are have their own spy satellites. Even if you don't have your own satellites, you can always rent some form an online marketplace. This has gotten so cheap that even YouTubers and Twitter addicts can afford to rent it. Here are a few examples of Open Source Intelligence analysts estimating Russian armoured losses by counting how many tanks the Russians have pulled out of storage yards.

- [YouTube - Russian Equipment Losses & Reserves (2024) - The Changing Russian Force in Ukraine](https://www.youtube.com/watch?v=xF-S4ktINDU)
- [HighMarsed (@HighMarsed)](https://x.com/HighMarsed)
- [Jompy (@Jonpy99)](https://x.com/Jonpy99)

![A video screenshot comparing two satellite images of a military site](/Assets/FreeSpaceLaserCommunications/Pasted%20image%2020261105155355.png)

Maybe more relevant to us is maritime tracking.  Between Russian ghost fleets smuggling oil out of the country wearing false flags, illegal fishing, people and drug smuggling, and whatever the hell is going on in the Strait of Hormuz this week, there are a lot of good reasons for tracking the ships who don't want to be found. 

![ICEYE radar image showing ships at sea, with two highlighted](/Assets/FreeSpaceLaserCommunications/Pasted%20image%2020261105155518.png)  
*Marketing material from [ICEEYE](https://www.iceye.com/defense-and-intelligence/use-cases/maritime-domain-awareness)*

One way we can do this from space is with Synthetic Aperture Radar (SAR), which lets us detect anything on the surface of Earth, regardless of time or cloud cover. [The European Space Agency's ship detection instruments can detect vessels as small as 4 metres](https://knowledge-hub-gda.esa.int/eo_capability/ship-detection/).

This gets very difficult to scale up, however, as SAR datasets are huge, and they cannot possibly downlink all of the data using exisitng technology. As such they need to use some creative processing methods to reduce the downlink requirements.

<details class="callout note">
  <summary><strong>AI In Space</strong></summary>
  <p>As an aside, this has prompted one of the only good use cases for "AI in Space" which is to do all the data processing onboard the satellite and downlink the reduced datasets. This might mean doing all the calculations on board the satellite, or using "AI" (a classifier model) to decide which data is interesting enought to send first, and which is boring and can be deleted without analysis.</p>
</details>

But if you can measure anything ON the surface of Earth, can we measure the surface of the Earth itself? It turns out the answer is yes.

### Earth Surface Monitoring

[NISAR **(NASA–ISRO Synthetic Aperture Radar)**](https://nisar.jpl.nasa.gov/) is a satellite which uses its onboard SAR to monitor how the Earth's surface itself is changing. With a maximum precision of around 1 cm change in height over an area half the size of a tennis court, the system is used to monitor glaciers, forests and agriculture, and measure tectonic activity like earthquakes and volcanoes. 
 
![Radar image of farmland showing forests, wetlands, fields and irrigation in Minnesota](/Assets/FreeSpaceLaserCommunications/Pasted%20image%2020261105155619.png)

The mission also generates 80 terabytes of data every day. Like the previous example, it can't hope to downlink all that data, so it needs to perform onboard processing and prioritise what it thinks is important.

## Pointing Outwards

If we want to talk about astronomy, the space telescopes are also getting thirsty for more data. The Hubble Space Telescope downlinks about 3 gigabytes per day, while the new Roman Space Telescope will need to downlink 1375 gigabytes per day. 

![Chart comparing daily data sent to Earth: Hubble 2.7, Webb 58 and Roman 1,375 gigabytes](/Assets/FreeSpaceLaserCommunications/Pasted%20image%2020261105160549.png)  
*[Source: Audit of the Nancy Grace Roman Space Telescope Project (PDF)](https://oig.nasa.gov/wp-content/uploads/2024/07/ig-24-014.pdf)*

And already the James Webb Space Telescope has to schedule its operations around downlink, since its downlink speed is so much slower than its imaging speed. Let me emphasize this. The $10 billion telescope "wastes" most of its capability because we cannot download the data as fast as it can generate it. 

## Other kinds of Space Science

Astronomy isn't the only science we do in space. It turns out microgravity is really useful when you are trying to build three-dimensional stuff!

For example, growing complex biological tissue structures on Earth is difficult, since they will collapse under their own weight while we are growing them. However, we are seeing substantial progress on building complex 3D tissue structures in space's microgravity.

This leads us to growing organoids, 3D bio-printing, complex drug development and other crazy things. The [Bio-fabrication facility onboard the ISS exists to perform many of these experiments](https://www.nasa.gov/missions/station/iss-research/3d-bioprinting/) 

Being free from gravity's oppression also helps material science. For example, onboard the ISS we have demonstrated manufacturing of extremely high-purity optic fibres with very low attenuation, [link](https://www.nasa.gov/missions/station/iss-research/optical-fiber-production/)


![Microscope images comparing a crystallised optical fibre made on Earth with a smoother fibre made in microgravity](/Assets/FreeSpaceLaserCommunications/Pasted%20image%2020261105163310.png)

Optic fibres are not the only thing, with photonic crystals, nonlinear optical crystals and, I assume, other kinds of structures of interest to people outside of optics.

All these experiments need to be monitored and their results sent back to Earth. As we do more science in space, we also need to think about how we get that information home. 

## Wrapping Up

In the past, satellites used to take photos on physical film canisters and drop them to Earth ([Corona Satellites](https://en.wikipedia.org/wiki/CORONA_(satellite))), now we are pointing thousands of sensors at Earth, mapping every centimetre multispectrally, multitemporally and multikickassery. We need a way to collect and process as much of that data as possible, especially as we launch even more missions. 

We can build instruments that measure almost anything from space. The question now is whether we can get all those measurements home. One way to help is to use lasers instead of radio—which brings us to [Why Optical Increases Datarates](/garden/FreeSpaceLaserCommunications/Why%20Optical%20Increases%20Datarates.html).