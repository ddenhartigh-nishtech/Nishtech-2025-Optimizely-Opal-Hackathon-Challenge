# Nishtech 2025 Optimizely Opal Hackathon Challenge

LLMS.txt Generator • Competitive Analysis • Site Evaluation • REST Tools

Welcome to the Nishtech 2025 Optimizely Opal Hackathon Challenge repository. This project contains a suite of Opal AI Agents, Workflows, and Tools used to automatically generate LLMS.txt files, evaluate websites, run competitive research, and support automated content workflows.

The repo is organized into four main sections:

-   Agents (JSON agent definitions)
-   Instructions (workflow documentation and prompts)
-   Presentation (slide deck used for the hackathon)
-   Tools (supporting code used by the agents)

## Repository Structure

    root
    │   ReadMe.md
    │
    ├───agents
    │       business_competitive_analysis.json
    │       llms_txt_generator.json
    │       llms_txt_publisher_saas.json
    │       llms_txt_workflow.json
    │       site_evaluator.json
    │
    ├───instructions
    │       instructions.md
    │
    ├───presentation
    │       Nishtech Opal Hackathon Slide Deck.pdf
    │       Nishtech One Pager.pdf
    │
    └───tools
            rest_reques.ts

## Quick Start

If you're exploring this repo for the first time, start here.

### 1. What This Project Does

This project demonstrates how Optimizely Opal AI can be used to:

-   Generate LLMS.txt files automatically
-   Evaluate website content quality and structure
-   Run competitive landscape analysis
-   Trigger automated workflows through chat or scheduling
-   Publish LLMS.txt output to SaaS environments

## Agents

All agents are located in: `/agents`

### Key Agents

| Agent                                                                                                                                                                          | Description                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| [LLMS TXT Generator](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/agents/llms_txt_generator.json)                       | Crawls a target site, performs competitive research, and drafts LLMS.txt |
| [LLMS TXT Workflow](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/agents/llms_txt_workflow.json)                         | Orchestrates the full generation process, triggered via chat             |
| [LLMS TXT Publisher (SaaS)](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/agents/llms_txt_publisher_saas.json)           | Publishes the generated LLMS.txt to an Optimizely SaaS instance          |
| [Business Competitive Analysis](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/agents/business_competitive_analysis.json) | Performs market and competitor research                                  |
| [Site Evaluator](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/agents/site_evaluator.json)                               | Evaluates structure, performance, and content quality                    |

## Instructions

Documentation, prompts, and workflow notes exist in: `/instructions`

-   [instructions.md](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/instructions/instructions.md)

## Tools

Custom tooling for empowering Opal agents live in: `/tools`

-   [rest_reques.ts](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/tools/rest_reques.ts)

## Presentation Materials

`/presentation`

-   [Nishtech Opal Hackathon Slide Deck.pdf](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/presentation/Nishtech%20Opal%20Hackathon%20Slide%20Deck.pdf)

-   [Nishtech One Pager.pdf](https://github.com/ddenhartigh-nishtech/Nishtech-2025-Optimizely-Opal-Hackathon-Challenge/blob/main/Nishtech%20One%20Pager.pdf)

## How to Run the LLMS.txt Workflow

From within Opal chat:

    @llms_txt_workflow targetUrl = https://www.example.com/

Opal will:

1.  Crawl the target site
2.  Analyze content and competitors
3.  Generate LLMS.txt
4.  Publish it (if connected to SaaS)
