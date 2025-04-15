---
title: ChiCurate
date: 2024-11-17
description: Introducing ChiCurate, an open-source tool designed to help researchers streamline their ArXiv experience by combining keyword matching with LLM-powered ranking.
layout: blogpost.liquid
---
# Introducing ChiCurate: Your Personalized ArXiv Feed

In the fast-paced world of scientific research, staying up-to-date with
the latest publications is crucial. However, with hundreds of papers
published daily on ArXiv, finding the most relevant ones for your
research can be like searching for a needle in a haystack. Enter
ChiCurate, a simple tool designed to make researchers more efficient,
and unearth the papers they are interested in.

Get it [here!](https://github.com/CJones-Optics/ChiCurate)


## What is ChiCurate?

ChiCurate is an open-source tool that creates a personalized ArXiv feed
tailored to your specific research interests. By leveraging the power of
local Large Language Models (LLMs) and the simplicity of RSS feeds,
ChiCurate ranks papers based on their relevance to your work, saving you
valuable time and ensuring you never miss an important publication in
your field.

## Key Advantages

1.  **Personalization**: Unlike traditional RSS feeds, ChiCurate allows
    you to describe your research interests in plain language. The AI
    then uses this information to rank papers, ensuring you see the most
    relevant content first.
2.  **Local Processing**: ChiCurate runs on your local machine, ensuring
    privacy and giving you full control over the curation process.
3.  **Open Source**: The tool is open-source, allowing for community
    contributions and customizations to fit various research needs.
4.  **Efficient**: While it may take about 15 minutes to process a
    day\'s worth of papers, you can set it up to run automatically each
    morning, having your personalized feed ready before you start your
    day.
5.  **Flexible**: You can easily adjust your research interests or try
    different LLM models to optimize the curation process.
6.  **Resource-Friendly**: ChiCurate can run on modest hardware, making
    it accessible to researchers without high-end computing resources.

## How It Works

ChiCurate combines two key technologies:

1.  **Local LLMs**: Using Ollama, an open-source tool for running LLMs
    locally, ChiCurate analyzes paper titles (and potentially abstracts)
    to determine their relevance to your interests.
2.  **RSS Feeds**: The tool fetches the latest papers from ArXiv\'s RSS
    feeds, providing a structured and machine-readable interface for the
    LLM to process.

By describing your research interests to the AI, you create a
personalized algorithm that ranks papers based on their relevance to
your work. This approach gives you the benefits of a curated feed while
maintaining full control over the curation process.

## Installation Guide

To get started with ChiCurate, follow these steps:

1.  **Install Ollama**:
    -   For Linux: `curl -fsSL https://ollama.com/install.sh | sh`
    -   For Windows: Install WSL (Windows Subsystem for Linux) first,
        then follow the Linux instructions
    -   For MacOS: Download the dedicated installer from the Ollama
        website

2.  **Pull the LLM Model**:

        ollama pull mistral-nemo

3.  **Install ChiCurate**:

        git clone https://github.com/CJones-Optics/ArXivCurator.git
                        cd ./ArXivCurator
                        python3 -m venv .venv
                        source .venv/activate
                        pip install -r requirements.txt

4.  **Configure ChiCurate**:
    -   Edit `./userData/feeds.csv` to include the ArXiv RSS feeds
        you\'re interested in
    -   Modify `./userData/userPrompt.txt` to describe your research
        interests
    -   Adjust `config.yaml` if needed (e.g., to change the LLM model or
        batch size)

5.  **Run ArXiv Curator**:

    Execute `run.sh` to start the curation process

For optimal use, consider setting up a cron job to run ChiCurate
automatically each morning.

**UPDATE: September 2024**
Stay Tuned. I have made the program even more efficient :)
