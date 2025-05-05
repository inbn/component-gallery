---
title: Pagination
path: components/pagination
date: 2019-11-16
---

## Description

The most basic form of pagination controls are simple 'next' and 'previous' buttons. More complex solutions may include links to specific page numbers and/or the first and last pages.

## Markup

Here is example mark up for pagination on a blog article listing page. This example uses links to specific, numbered pages; the user is currently on `/blog?p=2`, the second page of results:

```html
<nav aria-label="Pagination">
  <ul>
    <li><a href="/blog">1</a></li>
    <li aria-current="page">2</li>
    <li><a href="/blog?p=3">3</a></li>
  </ul>
</nav>
```

- As pagination is a form of navigation it should be wrapped in a `<nav>` element. **Important note:** You may come across examples where `role="navigation"` is placed directly to the `ul` element itself (e.g. [this example from the Yale UI Style Guide](https://yaleux.github.io/yaleui/styleguide/pagination.html)). This is incorrect as the navigation role _overrides_ the list semantics of the `ul` as well as the `li` items inside.[^1]

- Add a meaningful label such as `aria-label="Pagination"` to the `<nav>` element to differentiate it from other navigation landmarks (such as your main site navigation, or [breadcrumbs](/components/breadcrumbs)).

- Add the `aria-current="page"` attribute to the list item which represents the current page. As clicking on a link to the current page would do nothing but trigger a page reload, it's common for the link to be excluded here.

You can enhance the experience for users of assistive technology further by adding an accessible label to each item. Two possible ways of doing this are:

1. By using the `aria-label` attribute

2. By including text which is [_visually_ hidden](https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html), but still gets announced by screen readers (in the following example, this is done using the class, `visually-hidden`).

```html
<!-- Users of screen readers will hear "Page 2" -->
<li>
  <a href="/blog?p=2" aria-label="Page 2">2</a>
</li>
<!-- Users of screen readers will hear "Current page, page 3" -->
<li aria-current="page">
  <span class="visually-hidden">Current page, page </span>3
</li>
```

[^1]: [WAI-ARIA Authoring Practices 1.1 — 2.1 No ARIA is better than Bad ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/#no_aria_better_bad_aria)
