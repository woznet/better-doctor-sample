---
title: Installatie
slug: bdoctor/installation.aspx
draft: false

type: translation

menu:
  QuickLaunch:
    id: installation-nl
    parent: bdoctor/documentation
---

## Installatie

Bedankt voor uw interesse in `bdoctor`. De volgende informatie zal u helpen bij het installeren ervan.

`bdoctor` vereist **Node.js 22.13.0 of hoger**. Het is voorlopig een privépakket op GitHub Packages, dus npm heeft een GitHub-token nodig om het te installeren. Maak een klassiek persoonlijk toegangstoken met de scope `read:packages` aan, vanuit een account dat het pakket kan lezen, en meld u er eenmalig mee aan, met het token als wachtwoord:

```bash
npm login --scope=@woznet --auth-type=legacy --registry=https://npm.pkg.github.com
```

Installeer `bdoctor` daarna via npm:

```bash
npm i -g @woznet/better-doctor
```

## De webonderdeel-vereiste

Het installeren van de CLI is niet voldoende. Pagina's worden weergegeven door het **Better Doctor Markdown** webonderdeel. Een beheerder moet de bijbehorende SPFx-oplossing eerst uitrollen en beschikbaar maken voor uw site. Een publicatie-opdracht controleert hierop voordat er iets wordt gewijzigd, en stopt wanneer het ontbreekt.

## Probeer het uit

Om snel aan de slag te gaan, hebben we een [voorbeeldrepository](https://github.com/woznet/better-doctor-sample) voorzien waarmee u alle functionaliteiten van `Better Doctor` kunt testen.

## Navigatie

- [Home](../home)
- [Documentatie](./documentation)
  - [Opties](./options)
  - [Installatie](.)
  - [Pagina-creatie](./page-creation)
  - [Commando's](./commands)
  - [Inhoudsopgave](./tableOfContents)
- Testpagina's
  - [Codeblokken](../tests/codeblocks)
  - [Uitgebreide markdown](../tests/extended-markdown)
  - [Wiskunde](../tests/math)
  - [Shortcodes](../tests/shortcodes)
  - [Speciale tekens](../tests/special-characters)
