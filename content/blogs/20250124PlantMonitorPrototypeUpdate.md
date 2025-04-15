---
title: Plant Monitor Prototype Update
date: 2025-01-24
description: Update on the development of a wireless plant monitor prototype, including its features, functionality, and goals.
layout: blogpost.liquid
---



# My Wireless Plant Monitor! (Prototype)

I just wanted to do a quick writeup on a side project I am working on and share photos of an early prototype.


![](/Assets/20240124Plant.png)

**What is it:**
- I am working on a IoT system to monitor my plants and let me know when they need water.

**How does it work**
**Hardware**
- Raspberry PicoW
- Core Electronics Capacitive Soil Moisture Meter
- Core Electronics Pico Timer
- A couple AA batteries
**Software:**
- The firmware on the Pico is running micropython - a small footprint port of python designed to run on embedded devices
- It shoot messages over to my main PC, via MQTT
- My PC receives the messages via MosquittoMQTT running locally
- It then throws the messages into a SQLite database, where
- A python Flask App pulls out the data and throws it onto a web dashbaord
- (The web dashboard is hand rolled html, css and vanilla JS)


**Why not just...**
Why not just buy something, use an existing framework, check my plants myself, do literally anything else with my time.

Because I wanted to build something myself, and see how it works.

# 2 Requirements
I wanted my device to have the following characteristics

- Communicate wirelessly.
- Scalable
	- I have a few plants in a bunch of different places. This means I will need a number of sensors.
	- This Implied several sub-requirements
		- Cost
			- The device should cost <$30AUD per unit.
		- Software Scalability
			- The dashboard should scale to support up to 10 clients.
		- Manafacturability
			- I should be able to assemble future units in less than 30 minutes per unit. (Not including 3D print time)
- Power:
	- The device should last at least a month on a set of batteries
	- The device should be powered by disposable alkaline batteries (this is personal preference for convenience, safety, and scalability)

# 3 How I built it
## 3.1 Getting the electronics and sensors working

The first step was to get the physical bits and bobs working and playing nicely together. I threw all the components on a breadboard, plugged the sensor into my microcontrollers ADC, wrote a basic script to print the reading to serial and shut back down. Then I tested it on USB power, then through battery power and using the timer. Easy!


![](/Assets/20240124PlantMonitorBreadboard.png)


## 3.2 Soldering it all in place

Once I was happy that the electronics worked, I found a leftopver soldered breadboard from some previous work, and soldered everything down. I also found an old three pin connector which was lucky, this meant I could swap out the sensor in case I broke it or somehting.


![](/Assets/20240124PlantMonitorCircuitboard.png)


![](/Assets/20240124Circuitboardback.png)

## 3.3 Write the firmware

Next up, I had to do a second pass at the firmware, and get it actually doing what it is meant to. Now I got the device where it would
1. Connect to wifi
2. take 5 readings (and average them),
3. scale the reading to a calibrated value
4. shoot it over wifi to the base
5. shut back down

**here is where I ran into problems:** For some reason, there was a bug which showed up, ONLY when the USB was NOT plugged in. This was a nightmare to debug. Eventually I hooked up an extra OLED display over I2C, just to print out debug statements.

Eventually I figured out the problem and was able to move on. (For those curious, I had the device set to restard every 6s, for reasons still unknown, the device could connect to the wifi and take its reading in this time on USB power, but took longer than 6s on battery power, so the restart signal would hit halfway through connecting to the wifi and then everything would fall apart. - solution, just restart on a 1 minute cyuclke instead of 6s. )

4. 3D print a case

It aint pretty, and I ain sure it is waterproof, but here is the case fore prototype 1.



![](Assets/20240124FinalProduct.png)


## 3.4 Write the server code

Now comes the bit that I'm sure most people think is the easy bit, but I find tedious. I now needed to write the python code to :
1. Catch the incomming MQTT messages,
2. Thrw them into a database
3. Open a webserver,
4. Grab all the data from the database
5. Make it look pretty.

This is what I ended up with!


![](/Assets/20240124PlantMonitorDashboard.png)

# 4 Improvements for V2
I am sharing the total current state of the project, but I wouldn't reccomend copying it *just* yet, (at least without a lot of modification). Here is how I plan on improving V2

## 4.1 Device Housing and Footprint Design
- The Housing of the device is God-awful. It is way clunkier than the parts it is made of
- It isn't water-tight (I just avoid hitting it when I water the plants)
- THE BATTERIES ARN'T even enclosed.
	- The design of the case is a little funny, the switch and the battery replacement hatch are on opposite sides of the box. So I couldn't quite figure out how to enclose it and keep both accessible.
## 4.2 Electronics
- I plan on trying to see if I can reduce the power requirement to a pair of AA batteries, instead of three.
- This will help reduce the footprint of the system
## 4.3 Server Code
- At the moment the web-page looks very ugly, the graph is reactive which is nice, but the scale on the x-axis isn't working propperly, and is evenly spaceing each measurement, regardless of measurement time.
- This should be easy to fix, but just requires me to learn a bit more JavaScript.
- I would like to deploy the whole thing inside a docker container

## 4.4 Documentation
- Now that I have spotted the mistakes in V1, and know what improvements I want in V2,
- Version 2 will be propperly documented, including:
	- Bill Of Materials
	- Documented Firmware and Server Software, including install instructions for the server
	- 3D manufacturing files for the case. (.stl, .3mf as well as design files)
	- Photographed Assembly instructions.
