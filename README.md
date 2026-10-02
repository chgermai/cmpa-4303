# Views From the On-Call Chair

## What is this?

A semi-humorous blog about network infrastructure and on-call situation, war stories, outages, and jargon translated for normal people.

## Why does it exist?

The goal of this project was to take advantage of a backlog of real on-call incidents and turn it into something that can be consumed by any level engineer and without a strong networking background. I tried to find the humor of looking back at incidents instead of keeping a serious tone that may dissuade reading of the content.

## What tools did I use?

- **HTML, CSS, and JavaScript**, no framework. The site utilizes static content built at a small scale. A framework would have added tooling and complexity without any benefit.
- **GitHub and GitHub Pages** for version control and free static hosting utilizing the `main` branch.
- **VS Code with Claude Code** for the site development, specifically the CSS structure, responsive layout, post template, and the random-post feature.
- **Claude (Cowork)** for drafting the blog post content from real incident notes I provided. I needed to remove any identifying information prior to generating the pages. This allowed me to keep the identify content on corporate systems.

## How to visit it

Website URL: https://chgermai.github.io/cmpa-4303/
Repository: https://github.com/chgermai/cmpa-4303

## What changed from Project 01 to Project 02?

P01 shipped with 27 posts already but did not include a way to search through them. For P02, I added several components to make the site more usable:

- **Live search:** Added a client-side search box on the Posts page that filters the posts as you type, with a "no results" message instead of leaving the list blank.
- **Tag filtering:** Added a "Filter by tag" sidebar on the Posts page. The tag list is generated from the metadata in each post.
- **RSS Feed:** I added an RSS feed that will share up to 50 posts
- **Responsive Design:** I made adjustments to the flow and mobile view to make it usable across different devices. As an example, the sidebar for search and filtering is a collapsible menu on top for narrow screens.
