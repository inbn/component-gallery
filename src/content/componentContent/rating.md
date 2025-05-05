---
title: Rating
path: components/rating
date: 2022-05-07
---

## Description

The rating component has two main functions:

1. To display a single user's, or an aggregate, star rating for a product, service, page, or other entity (non-interactive)
2. To let users set their own star rating (interactive)

Depending on the individual use case, the component may need to perform both of these functions or just one of them.

## Markup and Accessiblity

### Displaying a rating

When displaying a non-interactive rating you should provide accessible text describing the rating. For example, by using an image with an `alt` attribute, [Visually Hidden](/components/visually-hidden) text, or an `aria-label` attribute. Consider also rendering these text labels visually, not only to users of assistive technologies; they can be especially useful when displaying fractions of stars. e.g. '4.2/5.0'.

### Setting a rating

An interactive rating component can be seen as a series of [radio inputs](/components/radio-button) with the values 0, 1, 2, 3, 4, 5. By default, this provides the following keyboard pattern for keyboard interaction:

- <kbd>Tab</kbd> to focus on the rating component (and move focus onto the next interactive
  element when pressed again)
- <kbd>→</kbd>/<kbd>↓</kbd> to increase the rating by one star
- <kbd>←</kbd>/<kbd>↑</kbd> to decrease the rating by one star

The behaviour of left and right arrows is logical, but you may choose to do what [Adobe Spectrum's rating component](https://spectrum.adobe.com/page/rating/#Keyboard-interactions) does and invert what the up and down arrows do: <kbd>↑</kbd> = +1 star and <kbd>↓</kbd> = -1 star.

In this [example rating component from MUI](https://mui.com/material-ui/react-rating/) both the `input` and the `label` for each option are visually hidden and a custom `svg` is shown instead.
