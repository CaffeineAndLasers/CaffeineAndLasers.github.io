---
title: Introducing ChiScraper
date: 2024-11-18
layout: blogpost.liquid
description: Introducing ChiScraper, an open-source tool designed to help researchers streamline their ArXiv experience by combining keyword matching with LLM-powered ranking.
nesting: "../"
---

# 1 [ChiScraper](https://chiscraper.github.io): Personalised ArXiv Assistant

Keeping up with the latest research papers can feel like drinking from a firehouse - Especially if you are following the current LLM trend. ChiScraper is an open-source tool that helps researchers take control of their ArXiv experience by combining a powerful keyword matching algorithm with LLM-powered ranking. Instead of wading through endless papers, Chi-scraper shows you what's relevant to your research interests and ranks them by importance. 

It's like having a personal research assistant that pre-screens papers before your morning coffee.

Visit the project [website](https://chiscraper.github.io), or the [GitHub Repo](https://github.com/ChiScraper/ChiScraper)


## 1.1 Smart Filtering Made Simple 

The workflow is straightforward: ChiScraper searches ArXiv based on your configured keywords, saves matching papers locally, and then uses AI to rank them by relevance to your interests. You can view the results either in your favorite markdown editor (*cough* Obsidian) or through ChiScraper's clean web interface.

The ranking algorithm is the part that I am particularly proud of. Instead of running a black box algorithm to maximise "engagement",  *Cough* YouTube, the ranking algorithm uses a small LLM with your natural language to rank papers according to your preferences. Just tell the AI what you want to read about, and the AI will skim the abstracts rand rank them for you. 

The great thing about simple LLM applications like this, is that it works even with small LLM models you can run locally. The program is written so that users can assign their own OpenAI compatible endpoint. This means you can enter in your OpenAI API key and use a GPT model, or you can run it locally through Ollama for free. 

## 1.2 Getting Started

If you're interested in trying ChiScraper, head over to [the project website](https://chiscraper.github.io/) for installation instructions and detailed documentation. The setup process is 
straightforward, and you can be up and running in minutes, whether you choose to use OpenAI's models or go the local LLM route.

# 2 How do I use it

## 2.1 Choosing Your LLM 
We purposely built the program to be model agnostic. For a "just works" config we defaulted to using OpenAI's GPT4o-mini model for the ranking. In my opinion this model is overkill for the task at hand, (but from a design perspective, we want a model which erred on too smart, rather than too dumb). 

In my experience, even for highly technical physics papers, models around the 8b mark work well. It works well with `llama3.1:8b`, but really like using it with `qwen2.5:7b`, which seems to be even smarter than 8b llama model, and has a slight performance edge thanks to its smaller size. 

## 2.2 Setting up a routine

*"Damn running it locally sounds cool, too bad I don't have a GPU so I cant"* - Neither do I!

For non-real-time applications, you can totally run one of these small models on CPU.  That's what I do! On my mid-range cpu, it takes Qwen2.5:7b about 20-40 seconds per paper to summarise.

So I have set it up as a cron job to run the search and rank algorithms in the morning before I make my coffee. Then it is ready before I sit down for the morning. 

## 2.3 My Configs

In my opinion, the key to getting the most out of ChiScraper is to start with broader keyword filters and let the AI ranking do the heavy lifting of determining relevance. This ensures you won't miss important papers while still maintaining a focused reading list.

I have a few keyword search configs, that I run daily. There is a basic tagging and filtering mechanism built in which lets us filter based on which keywords marked the paper.

### 2.3.1 Free Space Optical Comms 

```json
{
    "config_tag": "FSOC",
    "list_authors" : [],
    "list_categories" : ["astro-ph.IM","physics.optics","eess.SP"],
    "list_keywords_exclude" : [],
    "list_keywords_include" : [
            ["adaptive","optics"],
            [ ["atmosphere","atmospheric"],"turbulence"],
            ["wavefront","sensor"],
            ["free","space"],
            ["optical","communication"]
    ],
}
```

### 2.3.2 Quantum Optics

```json
{
    "config_tag": "QuantumOptics",
    "list_authors" : [],
    "list_categories" : ["astro-ph.IM","physics.optics","eess.SP"],
    "list_keywords_exclude" : [],
    "list_keywords_include" : [
            ["qubit"],
            ["QKD"],
            ["quantum","key","distribution"],
            ["quantum","communication"]
    ],
}
```