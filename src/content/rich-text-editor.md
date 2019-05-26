---
title: 'Rich text editor'
slug: 'rich-text-editor'
path: 'rich-text-editor'
date: '2019-05-22'
---

The rich text editor is one of the most complex interface components, both visually and under the surface. Borrowing heavily from desktop word processing software, it has become the primary means of writing blog posts, editing CMS-based websites and even composing emails. Fundamentally, a rich text editor is any interface for editing ‘rich text’. This is text that is richer than ‘plain text’ by virtue of having formatting: **bold**, _italic_, ~~strikethrough~~, different fonts, headings, ordered lists, unordered lists, etc.

Before the widespread proliferation of rich text editors, adding formatting to text documents meant using a system such as [TeX](https://en.wikipedia.org/wiki/TeX). In TeX, you format using commands: e.g. `\textit{this text is in italics}` would output "_this text is in italics_". These italics are only visible in the output — you can't see them while editing. Each program tended to use its own special formatting commands with each language using different codes. One thing that these early markup languages did have in common, though was the content and the formatting commands are all mixed up with one another — what you see is _not_ what you get. wysiwyg (prononced wiz-ee-wig) or "what you see is what you get" editors aim to make the appearance of the content inside the editor resemble the final product as accurately as possible, hiding the formatting code from the user and showing its actual effect instead.

![Magazine advertisement for WordStar.](./images/WordStar_ad.jpg 'This ad for WordStar makes a big deal of its ‘what you see is what you get’ features')

One of the first Word Processors to label itself as wysiwyg was _WordStar_: priced at $495 + $50 for the manual[^1], version 1.0 was released in 1978. In WordStar, the user would apply formatting using 'Control codes'. For example, pressing `Ctrl + P` then `B` (or just `F4` if you were lucky enough to own a computer with function keys) would make the text bold. To move through the document, instead of using a mouse, you would use `Ctrl + E`, `Ctrl + X`, `Ctrl + S`, and `Ctrl + D` to move the cursor up, down, left or right respectively[^2]. Calling WordStar a wysiwyg editor is a stretch — the formatting visible on screen while editing is limited to line and page breaks. Bold and underline was still represented by inline commands like `^B` or `^Y`. Later versions added preview functionality so you could get a better idea of the layout of the printed page, but this took you out of the editing mode.

Arriving soon after WordStar, _WordPerfect_ introduced some improvements to differentiate formatting on screen: displaying bold text brighter and actually rendering a line below underlined text.

![Magazine advertisement for Microsoft Word.](./images/Microsoft_Word_ad.jpg 'In a not-so-subtle dig at WordStar, this ad for Microsoft Word explains how it improves on existing wysiwyg editors by showing formatting like bold, italic and underline on-screen')

The next major step in the world of wysiwyg editing was enabled by the development of the mouse; although first devised in the 1960s it wasn't until the 1980s that mice started to gain popularity. In 1983 Microsoft announced both the _The Microsoft mouse_ ($195) and _Multi-Tool Word_ ($395), a word processor designed to take advantage of the new peripheral (Microsoft would quickly simplify the name to just ‘Word’). The user no longer needed to type text commands to apply formatting but could instead use their mouse to navigate the Graphical User Interface (GUI), clicking on buttons and menus to apply specific formatting rules.

The year after the release of Microsoft Word, the Apple Macintosh was launched, which came bundled with Apple's new word processor, _MacWrite_. Although the feature set was rudimentary by today's standards, MacWrite had an intuitive mouse-based graphical user interface and boasted the ability to display different fonts and formatting during editing. MacWrite is often incorrectly labelled as the first wysiwyg editor, although — as with many of Apple's greatest successes, it was based on someone else's idea; in this case a prototype piece of software developed at Xerox PARC (A research centre in Palo Alto, California). _Bravo_, developed in 1974, 10 whole years before the release of MacWrite, was probably the world's first wysiwyg editor. You can hear Steve Jobs speak about his first encounter with a GUI at Xerox PARC in the film, _Triumph of the Nerds_[^5].

Until the take off of the world wide web, the majority of rich text content was written to be printed and the majority of online communication was just plain text. As more and more content was written primarily for the web, content writers needed a tool to format and style content without needing to know HTML or CSS. Web-based rich-text editors have become the tool of choice (or necessity) for many content writers. Word Processing for print has also moved into the browser with software like Google Docs.

Mainly due to the complexity of the task they're trying to do, wysiwyg editors tend to have issues:

- Accessibility for JavaScript applications is hard, especially when not appropriately prioritised and considered the from the beginning of development. The new editor in WordPress 5.0, [Gutenberg](https://wordpress.org/gutenberg/), has been [plagued by accessibility problems](https://wptavern.com/wpcampus-gutenberg-accessibility-audit-finds-significant-and-pervasive-accessibility-problems).

## Alternatives

### Markdown

Markdown is a markup language, but what differentiates it from early examples like TeX, is the readability of its syntax. In fact it borrows from existing conventions for marking up plain text in emails and online forums. e.g. `_italics_`, `**bold**`, `# Headings`, and starting lines with `>` to indicate a blockquote [^6]. The content on this page is written in markdown and parsed to generate the HTML rendered by your browser.

[^1]: [Word-Star](https://archive.org/stream/byte-magazine-1980-01#page/n49/mode/2up) BYTE (advertisement). January 1980. p. 49.
[^2]: [WordStar: A writer’s word processor](https://arstechnica.com/information-technology/2017/03/wordstar-a-writers-word-processor/) _Robert J. Sawyer_
[^3]: [Mouse and new WP program join Microsoft product lineup](https://books.google.co.uk/books?id=4S8EAAAAMBAJ&pg=PA10&redir_esc=y#v=onepage&q&f=false). 1983
[^4]: [WordStar vs. WordPerfect: a 'standard,' a challenger](https://www.csmonitor.com/1984/1107/110722.html)
[^5]: [Steve Jobs talks about his 1979 visit to Xerox PARC](https://player.vimeo.com/video/181839941)
[^6]: [Markdown: Syntax](https://daringfireball.net/projects/markdown/syntax)

<!-- prettier-ignore -->
*[wysiwyg]: what you see is what you get
