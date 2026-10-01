---
title: Home
description: "De Better Doctor documentatie landingspagina"

type: translation

# The automatic partials are in English. Like the English home page this one
# skips the banner, and it includes the Dutch navigation itself.
partials: false
---

<!-- Better Doctor Markdown strips inline styles, so the logo is sized with a width attribute:
     182 of its 1600 x 1763 pixels gives a height of 200. The web part sets height: auto on
     images, which would override a height attribute. -->
<img src="./assets/bdoctor.png" alt="Better Doctor" width="182" />

## Onderhoud uw documentatie probleemloos op SharePoint

Welkom op de statische pagina gemaakt door `bdoctor`!

Elke pagina op deze site is geschreven als een Markdown-bestand in een Git-repository, en hier gepubliceerd door één `bdoctor publish`-opdracht. De repository blijft leidend: pas de bronbestanden aan, publiceer opnieuw, en deze pagina volgt.

<include file="nl/navigation" />
