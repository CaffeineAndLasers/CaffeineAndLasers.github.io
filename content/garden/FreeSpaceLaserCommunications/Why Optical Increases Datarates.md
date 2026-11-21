---
title: Why Optical Links Increase Data Rates
date: 2026-11-04
lastEdited: "2026-11-20"
---

# Why Optical Links Increase Data Rates

![Animation comparing radio and laser communications](/Assets/RFvsLaser.gif)  
*Animation source: [Laser Communication (Lasercom) Animations on Imgur](https://imgur.com/gallery/laser-communication-lasercom-animations-84QHDOL).*

During the Artemis II mission in April 2026, [our lab at Mount Stromlo received data from the Orion spacecraft by laser](https://rsaa.anu.edu.au/news-events/news/moment-we-connected-aretmis-ii-see-moon-never) at **260 megabits per second** from **343,000 kilometres away**. For comparison, Orion’s onboard radio link could only send data at [**2 megabits per second**](https://ntrs.nasa.gov/api/citations/20230001988/downloads/230305%20OFC%20Robinson%20Optical%20Communications%20for%20Space%20Exploration%20and%20Science%20RR.pdf#page=11).

The laser’s light doesn't travel any faster, both infrared and radio travel at the speed of light. The laser link could just send more data in the same amount of time. Why is this? 

The short answer is: since infrared light has a higher frequency than radio, we can modualte it faster. Switching it on and off more quickly means we can fit more 1s and 0s in the laser per second. 

That is the short answer. To anser it proppelry, we need to talk about, **bandwidth**: how wide a slice of the spectrum a signal uses.

Both radio and laser links start with a wave called a *carrier*. To send a message, you change that wave in a pattern the receiver can read. For example, in FM radio we mix the carrier wave with the audio wave, to modulate its frequency, as you can see in the left hand column below.

![The carrier is a single spike at 150 Hz. After modulation, the signal spreads out around 150 Hz, with a purple bracket marking about 82 Hz of occupied bandwidth.](/Assets/BandwidthInfographic.png)

But look at the right-hand column, this is the frequencies that our communication beam uses up.. The plain carrier at the top is a single spike at 150 Hz. But when we mix is with the audio signal, the frequency spreads out, and uses a range of frequencies around it. The purple bracket marks the band that contains 99% of the signal’s power. It’s about 82 Hz wide: that’s the signal’s *occupied bandwidth*. We can express this as a percentage, the bandiwidth is about 54\% of the size of the carrier frequency.  

The reason this is important, is that the theoretical *maximum ammount of information* a wave can carry, given by the Shannon–Hartley theorem, depends on the bandwidth of the signal. So if we want to transer something more complicated than audio, lets say video, we would need a MUCH larger bandwidth than the one we gave above.  

<details class="callout note">
  <summary><strong>The "I'm not scared of maths" button</strong></summary>

The Shannon-Hartley theorem says that theoretical capacity of a channel in bits per second $C$, is given by the Bandwidth $B$ in hertz, multiplies by the $\log_2$ of $1$ plus the Signal to noise ration $S/N$. i.e.

$$
C = B\log_2(1+S/N)
$$

This means that at the same signal-to-noise ratio, doubling the bandwidth doubles the theoretical capacity.

</details>

This is why infrared frequencies come in handy. The laser carrier frequency is much higher than a radio’s. So if you take the same percentage of each carrier frequency, the laser gets a much wider band. Same fraction of the pie, much bigger slice.

Here’s what that looks like if we give each signal a bandwidth of **0.02% of its carrier frequency**:

<div class="bandwidth-comparison-table">

| Carrier | Carrier frequency | Bandwidth |
| --- | ---: | ---: |
| Radio | 1 GHz | 200 kHz |
| Microwave | 10 GHz | 2 MHz |
| Infrared laser (1550 nm) | 193.4 THz | 38.7 GHz |

</div>

<details class="callout note">
  <summary><strong>The maths: fractional bandwidth</strong></summary>

$$
B=(f_c+Xf_c)-(f_c-Xf_c)=2Xf_c
$$

Here $f_c$ is the carrier frequency and $X$ is the fractional offset from the carrier to either edge of the band. In the table, $X = 10^{-4}$: that’s 0.01% on each side, or 0.02% in total.

</details>

In this example, the laser gets nearly **200,000 times the bandwidth** of the 1 GHz radio signal. If both signals were equally strong relative to the noise at the receiver, the [Shannon–Hartley theorem](https://en.wikipedia.org/wiki/Shannon%E2%80%93Hartley_theorem) says the laser link could theoretically carry nearly 200,000 times as much data per second.  Of course this is the theoretical maximum, not the actually achievable reates. 

Onboard the Artemis II mission, we demonstrated  a maximum speed of 260 Mbps at 343,000km though our lab in Mount Stromlo [link](https://rsaa.anu.edu.au/news-events/news/moment-we-connected-aretmis-ii-see-moon-never), compared to the S-Band RF link maxed out at 2Mbps [Link-Slide 11](https://ntrs.nasa.gov/api/citations/20230001988/downloads/230305%20OFC%20Robinson%20Optical%20Communications%20for%20Space%20Exploration%20and%20Science%20RR.pdf)

[Put succinctly by Nasa's Kendall Murphy](https://www.nasa.gov/missions/artemis/artemis-2/nasa-laser-terminal-enhances-views-during-artemis-ii-mission/)
> "During the about 10-day journey, the laser communications system exchanged 484 gigabytes of data between Orion and Earth, roughly equivalent to 100 high-definition movies"

So if laser comms is so great, why did we still launch with a radio antenna at all? This high speed came at a cost. Laser communication requires very precise alignment, and good weather. Even a single cloud can break an optical link, and the laser tracking precedure between the spacecraft and the ground station requires a great deal of coordination between the two. As such, we still need a high reliability radio antenna on board.  This will be covered in a future entry. 

But what do we need all that data for? I answer that in this blogpost 
[Why do we need all the data in space anyway?](/garden/FreeSpaceLaserCommunications/Why%20do%20we%20need%20all%20the%20data%20in%20space%20anyway.html)

