---
title: 'About'
slug: 'about'
path: 'about'
date: '2019-03-25'
---

**Started in early 2019, _The Component Gallery_ is the product of an ongoing survey into the components that make up design systems**. It exists primarily as a collection of component examples, grouped by the type of component. I created this website to help with some of the problems that I experience every day as a front-end developer:

1. There are some interface problems that have **already been solved**: there’s no need to reinvent the wheel every time you start a new project. Grouping examples by type of component makes it simple to find all the relevant examples for a specific interface problem.
2. **Naming things is hard**: If you don’t know what to call a thing, looking at what other people are calling similar things is a great place to start.

**Caveat:** Don’t just assume because an opinion is popular, it’s correct. Be wary of [information cascades](https://en.wikipedia.org/wiki/Information_cascade) and, if you can, always base your decisions on **research**. [**_Definitely_** don’t just copy what everyone else is doing](https://noti.st/stephenhay/nLABeP/i-don-t-care-what-airbnb-is-doing-and-neither-should-you). There’s a tonne of research out there already—look for design systems that give reasoning for decisions based on real research.

## FAQs

### Why components?

> “Components is a damn fine way to build a website”
>
> – <cite>Chris Coyier</cite>

Designing interfaces around components, specifically components from a design system, has a number of benefits:

1. **Consistency**: keep a consistent "look and feel" throughout, making user experiences feel more coherent, even across discrete products.
2. **Reusability**: Instead of building something from scratch, you can use something that's already been tried and tested and proven to work.
3. **A common language**: Design systems can help all teams involved in a project communicate effectively, using a shared set of names for things that everyone understands.

### What is a component?

A component is a single, reusable chunk of a user interface.

### Can a component contain other components?

Yes, a component can contain other components, in fact this nesting of components to build interfaces is fundamental to methodologies such as [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/).

### Are Web Components components?

[Web Components](https://www.webcomponents.org/introduction) are a collection of browser features and JavaScript APIs that allow developers to define custom elements by extending native HTML elements. Web Components aren't just another framework, they're a standardised way to build components that work across browsers and devices, without the need to load in many hundreds of kilobytes of JavaScript.

### What about React components?

[Yup](https://reactjs.org/docs/components-and-props.html)

<!-- **Short answer:** Yes -->

<!-- **Longer answer**React is a great way to start thinking of user interfaces in a component-based way. While you _could_ put your whole interface in one single react component, you'll quickly see the benefit of splitting recurring patterns into separate component files, each with their own props, state, and methods. -->

### Vue?

Also [yes](https://vuejs.org/v2/guide/components.html)

### What’s the difference between a Design System and a Component Library?

A successful design system is way more than a website showing a few components, even if components often play an important part. A good design system is a set of shared practices that cover a wide range of topics including colour palettes, typography, processes, accessibility, tooling and 'tone of voice'. The components themselves should be supported by guidance on exactly how to use a component, when to use a component and when not to.

### Are components just for websites?

Absolutely not: component-based User-Interface design was around way before websites existed; the examples on this website are collected from websites because that's the easiest place to find public design systems. However, with the power of technologies such as [React Native](https://facebook.github.io/react-native/) and [Electron](https://electronjs.org/), components can be cross-platform with exactly the same code being used on a website, a mobile app or a desktop app.

### How do I go about making a design system?

There are lots of great resources to help you get started; here are just a few:

#### Books

- [Design Systems](https://designsystemsbook.com/) by Alla Kholmatova
- [Atomic Design](http://atomicdesign.bradfrost.com/table-of-contents/) by Brad Frost
- [Programming Design Systems](https://programmingdesignsystems.com/) by Rune Madsen
- [Building Design Systems](http://buildingdesignsystems.design/) by Sarrah Vesselov and Taurie Davis

_to be continued…_
