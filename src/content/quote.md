---
title: 'Quote'
slug: 'quote'
path: 'components/quote'
date: '2019-03-24'
---

## Description

Quotes come in three main flavours:

1. **Inline quotes** are set within normal paragraph text; with only punctuation marks used to visually differentiate them from regular text.
2. **Block quotes** are quotations from an outside source. They are usually included within the text column but in their own 'block', often with a distinct style, to differentiate them from regular text. As these are quotations from an outside source, they will often include a citation.
3. **Pull quotes** ‘pull’ a passage of text out of the main text column and give it a distinct look; often to add visual interest or to make an important point visible at a glance. Pull quotes tend to appear much larger than the body text for added impact.

## Markup

### Inline quotes

The HTML `q` element is designed to be used for inline quotations. According to the W3C spec:

<blockquote cite="https://www.w3.org/TR/2011/WD-html5-author-20110809/the-q-element.html">
  <p>The use of <code>q</code> elements to mark up quotations is entirely optional; using explicit quotation punctuation without <code>q</code> elements is just as correct.</p>
</blockquote>

Unless you want to make use of the [`cite`](#the-cite-attribute) attribute or style your quotes with the [CSS quotes property](https://css-tricks.com/almanac/properties/q/quotes/), you are fine using quote marks instead of the `q` element.

### Block quotes

The HTML `blockquote` element is designed to be used for extended quotations.

### Pull quotes

As pull quotes duplicate content from the main body of the article, they can be seen as non-essential parts of the document — you can indicate this using an `aside` element.

```html
<article>
  <!-- Some article content here… -->
  <aside>
    <!-- pull quote content -->
  </aside>
  <!-- Article content continued… -->
</article>
```

If the text in your pull quote is _also_ text from another source (e.g. if your pull-quote is a short snippet of a longer quote that appears in the article), you can put the text inside a `q` or `blockquote` element, within the `aside`.

A quick note on using aside elements: when an `aside` is used _inside_ an `article` element, like in the snippet above, the `aside` should relate directly to the article itself. If an `aside` is _not_ wrapped in an `article` element, it should be used for more generic content, not specifically related to the current page[^1].

### The `cite` attribute

You can optionally use the `cite` attribute to specify the **URL** to the source of a quote. This is valid on both `q` and `blockquote` elements; when used for blockquotes it does not replace the `<cite>` element, as it provides different information. e.g.

```html
<blockquote
  cite="https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch04.htm"
>
  <p>
    Let the ruling classes tremble at a Communistic revolution. The proletarians
    have nothing to lose but their chains. They have a world to win. Working Men
    of All Countries, Unite!
  </p>
  <footer>— Karl Marx, <cite>Manifesto of the Communist Party</cite></footer>
</blockquote>
```

## Styling

Quotes tend to come with some default browser styling.

- `q` elements will have open and closing quotes added as `::before`, `::after` pseudo-elements.
- `blockquote` elements are indented on the left and right using the `margin` property.
- `cite` elements tend to have `text-decoration` set to 'italic'.

You can choose to override these (some CSS resets will do this automatically), but they are sensible defaults. If you want to enhance the appearance of your quotes, there are plenty of typographical and layout techniques available.

### Hanging punctuation

A common typographical technique is “hanging” the open quote mark of a quote _outside_ the main text column. To do this in CSS, you can make use the `hanging-punctuation` property. e.g.

```css
blockquote p {
  hanging-punctuation: first;
}
```

Unfortunately, this technique is, at the time of writing, only supported in Safari. If you want to, you can add it anyway and treat it as a [Progressive Enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) for Safari users; alternatively you can achieve the same effect (albeit with a little manual tweaking), using a negative left margin.[^2]

<iframe height="350" style="width: 100%;" scrolling="no" title="Example quote styles" src="https://codepen.io/inbn/embed/preview/yLLGYgN?height=350&theme-id=light&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true" class="mt-6">
  See the Pen <a href='https://codepen.io/inbn/pen/yLLGYgN'>Example quote styles</a> by Iain Bean
  (<a href='https://codepen.io/inbn'>@inbn</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Usage guidelines

- Including pull quotes outside of the main text column can be difficult on smaller devices, as text generally spans the full width of the screen. As they duplicate content that already exists in the main text, you can choose to hide them when screen real-estate is scarce.
- Limit the number of pull quotes you use so that they do not lose their impact. Highlight maybe one or two of the most impactful snippets of content.
- Use the right type of quote for the job: not every external quotation needs to be placed in a block quote; consider putting shorter quotes inline.

[^1]: [The `aside` element, HTML5: Edition for Web Authors](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-aside-element.html)
[^2]: Technique from p.106, _Web Typography_ By Richard Rutter
