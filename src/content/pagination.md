---
title: 'Pagination'
slug: 'pagination'
path: 'components/pagination'
date: '2019-04-03'
---

## Description

Pagination is the process of dividing related content between multiple pages. Like pages in a book, these pages are ordered in a sequence. The term _pagination_ is also used for the interface controls used to navigate between pages.

The most basic pagination controls are simple 'next' and 'previous' buttons.

## Usage guidelines

### HTML

- As pagination is a form of **navigation** you should put them in a `<nav>` element.
- Add a meaningful label such as `aria-label="Pagination"` to the `<nav>` element to differentiate it from other navigation landmarks.
- Add the `aria-current="page"` attribute to the item which represents the current page.
