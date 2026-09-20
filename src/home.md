---
title: Home
slug: home.aspx
layout: Article
description: "The Better Doctor documentation homepage"

localization:
  "nl-nl": ./home.nl.lang.md
  "fr-fr":
  "es-es":

comments: true

# The logo below is the hero of this page, so the banner partial is skipped
partials:
  header: false

header:
  type: Custom
  image: './assets/bdoctor.png'
  translateX: 55.23
  translateY: 13.23
  showTopicHeader: true
  topicHeader: "Better Doctor"
  showPublishDate: true

menu:
  QuickLaunch:
    id: Home
    weight: 1
---

<p id="logo" style="text-align:center"><img style="height:200px" src="./assets/bdoctor.png" alt="Better Doctor" /></p>

## Maintain your documentation on SharePoint without pain

Welcome to the static page created by `bdoctor`!

Every page on this site was written as a Markdown file in a Git repository, and published here by a single `bdoctor publish` run. The repository stays authoritative: edit the sources, publish again, and this page follows.
