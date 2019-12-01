---
title: 'Alert'
slug: 'alert'
path: 'components/alert'
date: '2019-11-28'
---

## Description

An alert (not to be confused with the [JavaScript `window.alert()` method](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)) is a component for providing feedback to a user.

## Markup

```html
<div role="alert">
  That thing you just tried didn't work!
</div>
```

The role, "alert" is one of five special 'live region' roles. These make it possible to notify assistive technology when an element’s content changes, no matter what the user is currently focused on.

## Usage guidelines

Alerts, by definition, are disruptive. Lots of alerts at once or unnecessary alerts will create a bad user experience.[^1]

[^1]: [ARIA: alert role, MDN web docs](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Alert_Role)
