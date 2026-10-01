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

<!-- Better Doctor Markdown strips inline styles, so the logo is sized with a width attribute:
     182 of its 1600 x 1763 pixels gives a height of 200. The web part sets height: auto on
     images, which would override a height attribute. -->
<img src="./assets/bdoctor.png" alt="Better Doctor" width="182" />

## Maintain your documentation on SharePoint without pain

Welcome to the static page created by `bdoctor`!

Every page on this site was written as a Markdown file in a Git repository, and published here by a single `bdoctor publish` run. The repository stays authoritative: edit the sources, publish again, and this page follows.
