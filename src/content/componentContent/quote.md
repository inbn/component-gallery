---
title: Quote
path: components/quote
date: 2019-03-24
---

## Description

Quotes come in three main flavours:

1. **Inline quotes** are set within normal paragraph text; with only punctuation marks used to visually differentiate them from regular text.
2. **Block quotes** are quotations from an outside source. They are usually included within the text column but in their own 'block', often with a distinct style, to differentiate them from regular text. As these are quotations from an outside source, they will often include a citation.
3. **Pull quotes** ‘pull’ a passage of text out of the main text column and give it a distinct look; often to add visual interest or to make an important point visible at a glance. Pull quotes tend to appear much larger than the body text for added impact.

## Markup

### Inline quotes

The HTML `q` element is designed to be used for inline quotations, but it's not the only way of indicating an inline quote. According to the WHATWG spec:

<blockquote cite="https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-q-element">
  <p>
    The use of <code>q</code> elements to mark up quotations is entirely
    optional; using explicit quotation punctuation without <code>q</code>{' '}
    elements is just as correct.
  </p>
</blockquote>

Unless you want to make use of the [`cite`](#the-cite-attribute) attribute or style your quotes with the [CSS quotes property](https://css-tricks.com/almanac/properties/q/quotes/), there is little benefit to using the `q` element over quotation marks.

```html
<p>
  The Manifesto of the Communist Party begins with the line,
  <q>A spectre is haunting Europe – the spectre of communism.</q>
</p>
<!-- is equivalent to -->
<p>
  The Manifesto of the Communist Party begins with the line, “A spectre is
  haunting Europe – the spectre of communism.”
</p>
```

### Block quotes

The HTML `blockquote` element is designed to be used for extended quotations. If your quote is more than a few lines long, consider using a blockquote.

In the following code snippet, based on an example from [the WHATWG specification](https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element) the `blockquote` is wrapped in a `figure` element. It also makes use of the `cite` _attribute_ and the `cite` _element_ (both explained later). Note that the attribution for the quotation is placed **outside** the blockquote element.

```html
<figure>
  <blockquote
    cite="https://www.marxists.org/archive/marx/works/1848/communist-manifesto/ch04.htm"
  >
    <p>
      Let the ruling classes tremble at a Communistic revolution. The
      proletarians have nothing to lose but their chains. They have a world to
      win. Working Men of All Countries, Unite!
    </p>
  </blockquote>
  <figcaption>
    — Karl Marx and Friedrich Engels,
    <cite>Manifesto of the Communist Party</cite>
  </figcaption>
</figure>
```

### Pull quotes

As pull quotes duplicate content from the main body of the article, they can be seen as non-essential parts of the document — you can indicate this using an `aside` element.

```html
<article>
  <!-- Some article content here… -->
  <aside>
    <!-- Pull quote content -->
  </aside>
  <!-- Article content continued… -->
</article>
```

If the text in your pull quote is _also_ text from another source (e.g. if your pull-quote is a short snippet of a longer quote that appears in the article), you can put the text inside a `q` or `blockquote` element, within the `aside`.

A quick note on using aside elements: when an `aside` is used _inside_ an `article` element, like in the snippet above, the `aside` should relate directly to the article itself. If an `aside` is used _outside_ an `article` element, it should be used for more generic content, not specifically related to the current page[^1].

### The `cite` _element_

The cite element is pretty strict in what it can contain: according to [the WHATWG spec](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-cite-element) it must be the **title** of a ‘creative work’; for example: a book, a film, or a web page. It should not include the author of the work.

### The `cite` _attribute_

You can optionally use the `cite` attribute to specify the **URL** to the source of a quote. This is valid on both `q` and `blockquote` elements; when used for blockquotes it does not replace the `<cite>` element, as it provides different information.

## Styling

Quotes tend to come with some default browser styling.

- `q` elements will have open and closing quotes added as `::before`, `::after` pseudo-elements.
- `blockquote` elements are indented on the left and right using the `margin` property.
- `cite` elements tend to have `text-decoration` set to 'italic'.

You can choose to override these (some CSS resets will do this automatically) but they are sensible defaults. If you want to enhance the appearance of your quotes, here are some of the typographical and layout techniques available:

### Customising quotation marks

The CSS `quotes` property gives us fine control over the style of our quotation marks. e.g. if you’re putting your quote inside a `<p>` nested within a blockquote, you can add the open and closing quotation marks as pseudo-elements with the following CSS:

```css
blockquote p {
  /* Use curly quotes, not straight quotes */
  quotes: '“' '”' '‘' '’';
}

blockquote p::before {
  content: open-quote;
}

blockquote p::after {
  content: close-quote;
}
```

The `quotes` property also gives you control over the characters used; in the example above, we are forcing the browser to use the nicer-looking ‘curly’ quotes instead of the generic 'straight' quotes[^2]. Be aware that different languages use a [wide variety of quotation mark styles](https://en.wikipedia.org/wiki/Quotation_mark#Summary_table) and you may have to define these on a language by language basis (e.g. guillemets — « and » — are commonly used in French).

One possible advantage of using the `q` element over quotation marks for inline quotes is that most browsers will automatically adjust the type of quotation marks used based on the HTML `lang` attribute.

### Hanging punctuation

A common typographical technique is “hanging” the open-quote mark of a quote _outside_ the main text column. To do this in CSS, you can make use the `hanging-punctuation` property. e.g.

```css
blockquote p {
  hanging-punctuation: first;
}
```

Unfortunately, this technique is, at the time of writing, only supported in Safari. If you want to, you can add it anyway and treat it as a [Progressive Enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) for Safari users; alternatively, you can achieve the same effect (albeit with a little manual tweaking), using a negative left margin.[^3]

<iframe
  height="350"
  style="width: 100%;"
  scrolling="no"
  title="Example quote styles"
  src="https://codepen.io/inbn/embed/preview/yLLGYgN?height=350&theme-id=light&default-tab=html,result"
  frameborder="no"
  allowtransparency="true"
  allowfullscreen="true"
  class="mt-4"
>
  See the Pen{' '}
  <a href="https://codepen.io/inbn/pen/yLLGYgN">Example quote styles</a> by Iain
  Bean (<a href="https://codepen.io/inbn">@inbn</a>) on{' '}
  <a href="https://codepen.io">CodePen</a>.
</iframe>

## Usage guidelines

- Displaying pull quotes outside of the main text column can be difficult on smaller devices because you probably want your main text column to span the full width of the screen. As pull quotes duplicate content that already exists in the main text, you may choose to hide them when screen real-estate is scarce.
- Limit the number of pull quotes you use so that they do not lose their impact. Highlight one or two of the most impactful snippets of content.
- Use the correct type of quote for the job: not every external quotation needs to go in a block quote; consider putting shorter quotes inline.

[^1]: [The `aside` element, HTML5: Edition for Web Authors](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-aside-element.html)
[^2]: [Straight and curly quotes, Butterick’s Practical Typography](https://practicaltypography.com/straight-and-curly-quotes.html)
[^3]: Technique from p.106, _Web Typography_ By Richard Rutter
