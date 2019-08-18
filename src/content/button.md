---
title: 'Button'
slug: 'button'
path: 'components/button'
date: '2019-05-08'
---

## Description

It's important to make a differentiation here: when people talk about buttons in regards to the web, they're usually talking about one of three things:

1. The `<button>` element which, depending on its type attribute (`submit`, `reset` or `button`), triggers some kind of action; usually submitting a form or triggering some JavaScript.
2. The `<input type="submit">`, `<input type="reset">`, `<input type="button">` which are functionally almost identical to the newer `<button>` element.
3. Any other interactive html element that looks like a button, but isn’t a `<button>`. This can include ‘call-to-action’ links designed to look like buttons, or any other ‘fake’ buttons.

This article will focus on the first case and ignore the second. If you're interested in the third case, you’re probably either looking for the page on [links](/components/link); or you’re using the wrong element for your buttons (and you should read on to learn why).

## Usage guidelines

### Fundamentals

- Use buttons for performing an action. e.g. ‘Submit’, ‘Delete’, ‘Create’, ‘Hide’
- Use links for navigating to other pages or within the current page
- Make buttons look like buttons and links look like links

### Semantic HTML

Semantic button markup is so easy to do right, it’s amazing how commonly it’s done wrong. Look at this commonly used (anti)pattern:

```html
<a href="#" class="action-button">I'm a button, click me</a>
```

On its own, clicking on this link would simply append a '#' to the current URL. Using jQuery (because these examples almost always use jQuery), an event listener is attached to the element to prevent the default behaviour and trigger an action:

```javascript
$('.action-button').click(function(event) {
  // This prevents the link’s default behaviour
  event.preventDefault();
  // Code to do an action here…
});
```

While this technically _works,_ it’s not ideal. Users expect certain behaviours from links (e.g. middle click to open in new tab) and others from a button (e.g. 'click' with the space key). If those expectations are not met, users may get confused or frustrated.

A far worse thing to do would be to use a non-focusable element such as a `<span>`, `<div>` or an `<a>` with an empty or missing `href` attribute. These will not appear in the tab order and are therefore completely inaccessible to those users who navigate solely using a keyboard.

```html
<!-- None of these “buttons” are buttons to assisstive technologies -->
<div class="action-button">I'm a button, click me</div>
<span class="action-button">I'm a button, click me</span>
<a class="action-button">I'm a button, click me</a>
```

> It should be noted that although it is possible to make these non-focusable elements accessible, this is only possible by fully replicating the functionality of the native `<button>` element. This involves using attributes such as `tabindex="0"` (to make it focusable); ARIA to communicate semantics to assistive technology; and JavaScript event listeners to add keyboard, touch and mouse interactivity. This is a lot of extra work considering the native button element gives you all this behaviour for free.

Here is some semantically correct button HTML:

```html
<button type="button">I'm a button, click me</button>
```

The only important thing to note is the `type` attribute; this can be one of the following:

- `submit`: The button submits the form data to the server.
- `reset`: The button resets all the controls to their initial values.
- `button`: The button has no default behaviour and does nothing when pressed. Needs JavaScript event listeners attached to it, to do anything.

If no type is specified or the type is invalid, the button is treated as if it had `type="submit"`.

### Appearance

As well as actually using the correct element, it's important to make it look and behave like the correct element. As already mentioned, users have certain expectations around how to interact with an element based on its appearance ([affordances](https://www.interaction-design.org/literature/topics/affordances)). The bare minimum requirements for a button are “some text in a rectangle”, but there’s a lot more you can do to make your buttons more usable.

Highly recommended:

- Dynamically size the button to fit the text in it
- Keep the text centre-aligned on a single line
- Ensure the button has distinct styles for disabled, hover, focused, active/pressed and default states.
- Unless it appears in a [button group](/components/button-group) with other options, use whitespace around the button to distinguish it from other content.
- Make the button big enough so users of touch devices can comfortably use it (a minimum of 10mm in both dimensions)

Worth trying:

- Give it rounded corners
- Use subtle box-shadows to raise the button above the rest of the page
- Add a gradient background to give it a 3D appearance

### Labelling

Communicate the purpose of a button clearly and concisely using a text label, an icon, or both. Instead of using generic labels like ‘OK’ or ‘Cancel’, think about what action clicking the button will trigger — if it deletes something, use ‘Delete’; if it places an order, use ‘Place order’.

If using _only_ an icon, you will need to ensure the button has a meaningful label.

[^1]: [Links vs. Buttons in Modern Web Applications — Marcy Sutton](https://marcysutton.com/links-vs-buttons-in-modern-web-applications)
[^2]: [7 Basic Rules for Button Design](https://uxplanet.org/7-basic-rules-for-button-design-63dcdf5676b4)
[^3]: [But sometimes links look like buttons (and buttons look like links)](https://medium.com/simple-human/but-sometimes-links-look-like-buttons-and-buttons-look-like-links-9b371c57b3d2)
