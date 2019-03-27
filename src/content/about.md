---
title: 'About'
slug: 'about'
path: 'about'
date: '2019-03-25'
---

## What is this website for?

I created this website to solve some of the problems that I experience every day as a front-end developer:

1. There are huge number of interface problems that have **already been solved**: there’s no need to reinvent the wheel every time you start a new project. Grouping examples by type of component helps makes it simple to find all the relevant examples for a specific interface problem.
2. **Naming things is hard**: If you don’t know what to call a thing, looking at what other people are calling similar things is a great place to start.

**Caveat:** Don’t just assume because an opinion is popular, it’s correct. Be wary of [information cascades](https://en.wikipedia.org/wiki/Information_cascade) and, if you can, base your decisions on **research** and [definitely don’t just copy what everyone else is doing](https://noti.st/stephenhay/nLABeP/i-don-t-care-what-airbnb-is-doing-and-neither-should-you). There’s a tonne of research out there already—look for design systems that [give reasoning for decisions based on research insights](http://design.bulb.co.uk).

## What is a component?

A component is a single, _reusable_ chunk of a user interface. A component can contain other components. (e.g. a form can contain many inputs). Even if a component appears only once in a single view, it's likely that it’ll be reused it somewhere.

## What about Web Components?

## What about React components?

React components that return something visual (e.g. some HTML elements) are a great starting point to think about components more generally. While you _could_ put your whole interface in one single react component, you'll quickly start to notice patterns that reoccur. Instead of repeating yourself, you'll then decide to abstract these into a separate component, each with their own props, state, and methods.

## Is a design systems just components?

A successful design system is more then just a component library. It should include guidance on exactly how and when to use each component as well as more general rules around colour palettes, tooling and tone of voice.

## Are components just for websites?

The examples on this website are collected from websites because _this_ is a website, but with the power of technologies such as [React Native](https://facebook.github.io/react-native/) and [Electron](https://electronjs.org/), components can be cross-platform, meaning the same component code can shared between a website, a mobile app and a desktop app.
