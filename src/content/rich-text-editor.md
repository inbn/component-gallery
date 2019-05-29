---
title: 'Rich text editor'
slug: 'rich-text-editor'
path: 'rich-text-editor'
date: '2019-05-22'
---

The rich text editor is one of the most complex interface components, both visually and technically. Borrowing heavily from desktop word processing software, it has become the primary means of writing blog posts, editing CMS-based websites and even composing emails. Fundamentally, a rich text editor is an interface for editing ‘rich text’. This is text that is richer than ‘plain text’ by virtue of having formatting: **bold**, _italic_, ~~strikethrough~~, different fonts, headings, ordered lists, unordered lists, etc.

Before the invention of word processing software, adding formatting to text documents meant using a markup language such as [TeX](https://en.wikipedia.org/wiki/TeX). In TeX, you format using commands: e.g. `\textit{this text is in italics}` would output "_this text is in italics_". These italics are only visible in the output — you can't see them while editing. Each markup language tended to use its own special commands to accomplish the same result. One thing that these early markup languages did have in common though, was that they mixed up the content and the formatting commands — what you see while editing is _not_ what you get as a result. wysiwyg (pronounced wiz-ee-wig) or "what you see is what you get" editors aim to make the appearance of the content inside the editor resemble the final product as accurately as possible, hiding the formatting code from the user and showing its actual effect instead.

![Magazine advertisement for WordStar.](./images/WordStar_ad.jpg 'This ad for WordStar makes a big deal of its ‘what you see is what you get’ features')

One of the first word processors to label itself as wysiwyg was _WordStar_: priced at $495 + $50 for the manual[^1], version 1.0 was released in 1978. In WordStar, the user would apply formatting using 'Control codes'. For example, pressing `Ctrl + P` then `B` (or just `F4` if you were lucky enough to own a computer with function keys) would make the text bold. To move through the document, instead of using a mouse, you would use `Ctrl + E`, `Ctrl + X`, `Ctrl + S`, and `Ctrl + D` to move the cursor up, down, left or right respectively[^2]. Calling WordStar a wysiwyg editor is a stretch — the formatting visible on screen while editing is limited to line and page breaks. Bold and underline was still represented by inline commands like `^B` or `^Y`. Later versions added preview functionality so you could get a better idea of the layout of the printed page, but this took you out of the editing mode.

Arriving soon after WordStar, _WordPerfect_ introduced some improvements to differentiate formatting on screen: displaying bold text brighter than regular text and rendering a line below underlined text.

![Magazine advertisement for Microsoft Word.](./images/Microsoft_Word_ad.jpg 'In a not-so-subtle dig at WordStar, this ad for Microsoft Word explains how it improves on existing wysiwyg editors by showing formatting like bold, italic and underline on-screen')[^3]

The next major step in the world of wysiwyg editing was triggered by the new found popularity of the mouse; although first devised in the 1960s, it wasn't until the 1980s that mice started to gain popularity. In 1983 Microsoft announced both the _The Microsoft mouse_ ($195) and _Multi-Tool Word_ ($395), a word processor designed to take advantage of the new peripheral (Microsoft would quickly simplify the name to just ‘Word’). The user no longer needed to type text commands to apply formatting but could instead use their mouse to navigate the Graphical User Interface (GUI), clicking on buttons and menus to apply specific formatting rules.

The year after the release of Microsoft Word, the Apple Macintosh was launched, which came bundled with Apple's new word processor, _MacWrite_. Although the feature set was rudimentary by today's standards, MacWrite had an intuitive mouse-based graphical user interface and boasted the ability to display different fonts and formatting during editing. MacWrite is often called the world's first wysiwyg editor, although — as with many of Apple's greatest successes — it was based on someone else's idea; in this case a prototype piece of software developed at Xerox PARC (A research centre in Palo Alto, California). _Bravo_, developed in 1974, 10 whole years before the release of MacWrite, was probably the world's first wysiwyg editor. You can hear Steve Jobs speak about his first encounter with a GUI at Xerox PARC in the film, _Triumph of the Nerds_[^5].

## wysiwyg for the web

Until the take off of the world wide web, rich text content was written to be printed and online communication was primarily in plain text. As the web as a publishing platform started to take form, content writers, designers, and other non-programmers needed a tool to create web content without needing to learn HTML, the markup language of the web. The first wysiwyg tool for building web pages, _WebMagic_, arrived in 1995 and was quickly followed by _FrontPage_ (purchased by Microsoft in 1996 for \$133million). These original tools were desktop applications you needed to purchase and install on your computer.

The rise of blogging around the turn of the millennium meant that a way of editing HTML content in the browser was needed. FCKeditor, later renamed to CKEditor (because "the FCK letters combined together are a shortcut for a bad word") and TinyMCE were some of the earliest examples of browser-based editors. Web-based rich-text editors have now become the tool of choice (or necessity) for many content writers. Word Processing for print has also moved into the browser with software like Google Docs.

So how do rich text editors actually work? Most modern wysiwyg editors now make use of the `contenteditable` html attribute, that when set to `true`, allows the user to directly edit the content of an element.

## Problems

Mainly due to the complexity of the task they're trying to do, rich text editors tend to have issues:

- As with all forms of wysiwyg, the appearance of content in the editor is usually just an approximation of the final output. Unless you're applying the exact same CSS and JS to the editable content as the output, there's likely to be visual discrepancies. Some implementations attempt to get around this issue with a ‘live preview’, showing a rendered version of the output alongside the editor which updates as you type.
- Accessibility for JavaScript applications is hard, especially when not appropriately prioritised and considered the from the beginning of development. The new editor in WordPress 5.0, [Gutenberg](https://wordpress.org/gutenberg/), has been [plagued by accessibility problems](https://wptavern.com/wpcampus-gutenberg-accessibility-audit-finds-significant-and-pervasive-accessibility-problems).

## Libraries

## Alternatives

### HTML

HTML is the primary markup language of the world wide web.

### Markdown

Markdown is another markup language, but what differentiates it from other markup languages is the readability of its syntax. The goal is that the formatting can be interpreted even in the original markup. In fact it borrows from existing conventions for marking up plain text in emails and online forums. e.g. `_italics_`, `**bold**`, `# Headings`, and starting lines with `>` to indicate a blockquote [^6]. Its simple design allows it to be converted to many output formats, not just HTML. Unfortunately while much of the Markdown syntax is intuitive, there are certain patterns that are definitely _not_: [the syntax for adding a link](https://daringfireball.net/projects/markdown/syntax#link) feels slightly arbitrary and is hard to remember; and adding markup that is not covered by Markdown’s syntax [requires the use of HTML](https://daringfireball.net/projects/markdown/syntax#html).

[^1]: [Word-Star](https://archive.org/stream/byte-magazine-1980-01#page/n49/mode/2up) BYTE (advertisement). January 1980. p. 49.
[^2]: [A POTTED HISTORY OF WORDSTAR](https://web.archive.org/web/20130706022357/http://www.wordstar.org/index.php/wordstar-history)
[^2]: [WordStar: A writer’s word processor](https://arstechnica.com/information-technology/2017/03/wordstar-a-writers-word-processor/) _Robert J. Sawyer_
[^3]: [Micosoft Word](https://archive.org/stream/byte-magazine-1983-12/1983_12_BYTE_08-12_Easy_Software#page/n89/mode/2up) BYTE (advertisement). December 1983. p. 88-9.
[^4]: [Mouse and new WP program join Microsoft product lineup](https://books.google.co.uk/books?id=4S8EAAAAMBAJ&pg=PA10&redir_esc=y#v=onepage&q&f=false). 1983
[^5]: [WordStar vs. WordPerfect: a 'standard,' a challenger](https://www.csmonitor.com/1984/1107/110722.html)
[^6]: [Steve Jobs talks about his 1979 visit to Xerox PARC](https://player.vimeo.com/video/181839941)
[^7]: [Rebranding](https://web.archive.org/web/20081231055546/http://docs.fckeditor.net/FCKeditor_3.x/Design_and_Architecture/Rebranding) FCK Editor docs
[^7]: [Your WYSIWYG Editor sucks](https://rachelandrew.co.uk/archives/2011/07/27/your-wysiwyg-editor-sucks/)
[^7]: [Markdown: Syntax](https://daringfireball.net/projects/markdown/syntax)

<!-- prettier-ignore -->
*[wysiwyg]: what you see is what you get
