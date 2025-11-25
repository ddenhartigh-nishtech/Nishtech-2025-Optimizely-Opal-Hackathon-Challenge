# Using the Optimizely Opal AI **LLMS.txt Generator**

The **LLMS.txt Generator** is an Opal AI--powered workflow that
automatically researches a website, analyzes its competitive landscape,
and generates an up-to-date, search-optimized **LLMS.txt** file.

This workflow is designed to be _hands-off_, _accurate_, and
_repeatable_---requiring only a single chat command to run.

## How to Use the Generator (Chat-Triggered Workflow)

Using the LLMS.txt Generator is simple:

1.  **Open your Opal Chat** inside Optimizely.

2.  In the message box, type the following command:

        @llms_txt_workflow targetUrl = https://www.example.com/

3.  Press **Enter**.

4.  The workflow immediately begins:

    -   Crawling the target website\
    -   Researching content, brand position, and competitors\
    -   Generating a structured, accurate `LLMS.txt` file

5.  Once complete, you can view the results in the **Workflow Execution** tab.

That's it---no manual setup, no special configuration.

## Optional: Automated Scheduled Generation (Zero Human Effort)

If you want LLMS.txt to stay refreshed **automatically**, you can create
a **scheduled variant** of your orchestrator agent:

-   This version of the agent runs on a **cron-like schedule** (daily, weekly, monthly, etc.)
-   It triggers the LLMS.txt workflow in the background
-   No chat input required
-   Ensures your LLMS.txt is always current, accurate, and fully aligned with live site changes

A scheduled workflow is ideal for: - Large or frequently updated sites\

-   SEO/AI governance teams\
-   Organizations minimizing manual maintenance

## Architecture Overview

-   **Orchestrator Agent**\
    Receives the invocation (chat or scheduled) and initiates the
    LLMS.txt workflow.

-   **LLMS.txt Workflow**\
    Performs research, extraction, competitive analysis, and drafting.

-   **Output Delivery**\
    The finished LLMS.txt content is stored and accessible through the
    workflow logs, ready for publishing.

-   **CMS Publishing**\
    The finished LLMS.txt content is published using custom rest_request tooling to the SaaS CMS APIs
