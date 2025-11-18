---
title: How to Actually Take notes
date: 2025-08-31
updated: 2025-09-01
description: "I've seen way too many people ask how do you use Obsidian, how do you take notes, it all seems so daunting. To be completely honest, it seems really obvious to me. So I figured I would just write down what I do."
layout: blogpost.liquid
tags:
	- Academia
---

# 1 How to take notes

I've seen way too many people ask how do you use Obsidian, how do you take notes, it all seems so daunting. To be completely honest, it seems really obvious to me. So I figured I would just write down what I do. The key to effective note-taking in Obsidian or any other system you want to use is to **WRITE THINGS DOWN**. Preferably in your system of choice. Everything else is secondary. However, I will admit that to many people a blank page is intimidating and they don't know where to start. 

So here are some rules of thumb I have taken on how to take notes:

## 1.1 "I just need to quickly drop something down. It's not a full-fledged note."

These should go into your daily note. Obsidian has a system for this as does I think just about every note editor you can think of.  No fancy templating needed here. Just have an area in your daily note where you can put bullet points for things you need to jot down for later. This might be random ideas that don't fit anywhere else. Or it could just be random, incidental details, things like phone numbers, names, URLs, that sort of thing. Your daily note should ideally replace your "send an email to yourself" kind of workflow.

My daily notes are also where I chuck my To-Do lists. 


## 1.2 "Notes about their own ideas" / "I just learned something new"

Generally, whenever I learn something relatively atomic, it goes into its own note. The threshold for deserving its own note is if I think to myself, "will I ever need to look this up again?" If the answer is yes, I throw it into a note. If I threw something in a daily note and then need to come back to it a few weeks later, I move it into its own note as well. 

The best way to structure these sorts of notes is in a parent-child and sibling approach using links. Since you don't need to decide which folder a note goes into when you use links, you can change your mind about what its parent is later or even have several parents.  For example, whenever I learn a new thing about how to do Python, I throw it into a new note and at the top of that note I have parent: python.  I also link to any related topics within the note as well so that I can find them in search for them later. I think of it like how wikipedia has the "See Also" section at the end of every article. 

Obsidian is nice, it has back-links. So from the Python note, I can see every other note which has listed Python as its parent. If your particular system doesn't support back-links, you can enter this manually. For structured learning, (anything where you're given a syllabus): I create the parent's note at the beginning of the course and immediately create notes for every item in the syllabus so I don't need to think about it later.

## 1.3 "What about project notes"

Notes on projects is a bit more complicated. I confess that this is where my system routinely fails. 

The most ADHD-proof system I have come up with is to log notes within the parent project notes chronologically. So I'll use  `YYYYMMDD_projectName` format for each day that I work on the project and just log down what I'm doing on that particular day.

This means that when I need to remember what I did on a particular day in the lab a month from now, I can just go through until I find the bit that I am sure that I wrote down at some point. The aim of this is to delay structuring the notes until later. 

Once I've finished a round of experiments or whatever your project happens to be, you can then choose to go back and format your notes in a way that makes sense to you after the fact. Trying to impose a structure on your project while you're still doing the project, I think is a little bit of a mistake. Largely because projects change and your note system needs to be extremely flexible. If your notes are less flexible than your project, then you won't be taking effective notes. I think this is where project managers say something about agile development practices.

## 1.4 Notes about things

### 1.4.1 Meetings

If I am taking minutes for a meeting it gets the title `YYYYMMDD_MeetingTopic` my minutes are then in dot bullet points. 

---
> **Pro Tip:**
> Since Obsidian has backlinks, I create an empty note with the name of anyone I have ever had a meeting with, and link to that note inside the meeting minutes. Then, I can click on that persons notes and quickly see my meeting minutes for every meeting I have had with that person
---

### 1.4.2 Research Notes
Here's where my advice gets a bit more specific. I previously wrote a blog post linked [here](https://caffeineandlasers.com/blogs/How_I_do_my_Research(As_a_PhD_Student).html) which goes into detail about how I take notes on various scientific papers.  The short version is I use Zotero to track the PDFs of all scientific papers I read and through some plugins that sync with my obsidian notes to create the obsidian note for each source automatically, then I can link my notes to the source easily. 

I sometimes do the same with books.

Generally, when I'm feeling disciplined, my process for note taking on things I read is the following. Direct quotes that I copy and paste from what I read go in that source's own note. That's the one that's generated by Zotero. My thoughts about what it says go in a new note. Because I'm an academic and citations are serious in the new notes, I make sure to link back to the source note wherever I am thinking about that source. Making sure to have very clear boundaries between what you have taken from others and what is a quote / paraphrase is VERY important in academia. Since I do not want to forget what are my thoughts and what came from others, a structural separation is very important for me. 

An example of this might be a textbook I've been reading on for [photonic crystals](https://en.wikipedia.org/wiki/Photonic_crystal). Suppose, I just read the chapter on how to calculate propagation modes within a crystal (What that means doesn't matter here). The equations and quotes I rip straight out of the textbook go in my textbook note, then I create my own note called *"Photonic Crystal Propagation Modes"*, where I link back to the textbook note.

The general idea here should be that the source notes can contain whatever copy and paste the things I need. However, my own notes should not have anything copy and pasted without attribution. This saves any future headaches and prevents me from accidentally doing a plagiarism by confusing other people's writing with my own.

This section is admittedly the most complicated part of my note taking and where I'll forgive people for saying they get overwhelmed. But I also think this level of diligence is only required if you are doing any kind of publication or academic work.

# 2 Topics Vs Types of Notes

When it comes to deciding how to organise your folder structure, or whatever else, it helps to have a clear idea of the difference between what topic a file might refer to, and what type of file it is. For example, take my meeting minutes from a research meeting. The note is *about* research, so it's topic is research, but its *type* is meeting minutes. 

A note can hypothetically have several topics, but not several types. I could cover multiple things in my meeting notes, but I can't have meeting notes that are also lab notes. 

With that in mind, I find the best way to organise is use folders for types of notes, and tags for note topics. Meetings, Research notes, lab notes etc all get their own folders, but 'optics', "quantum", "statistics" get tags, since one note could refer to multiple topics, e.g. "Quantum Optics", so that note gets both tags. 

## 2.1 When to break the rules

My exception to the rule I just established is in journaling. I am a big fan of journaling. I am a big fan of backing up my notes onto "the cloud". I am **NOT** a big fan of backing up my private journaling to the cloud. 

So for this reason my journaling goes into its own folder where my automated backup and sync knows not to touch it. 

# 3 Concluding thoughts

This isn't a "system", I'm not telling you rules, I'm not your dad. 

This is just how I happen to do things. Once again, the only important bit is to write things down. The structure will emerge itself.... Probably 



