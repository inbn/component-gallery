---
title: 'Rich text editor'
slug: 'rich-text-editor'
path: 'components/rich-text-editor'
date: '2019-05-22'
---

The rich text editor is one of the most complex interface components, both visually and technically. Borrowing heavily from desktop word processing software, it has gradually become the primary means of writing blog posts, editing CMS-based websites and even composing emails. Fundamentally, a rich text editor is an interface for editing ‘rich text’. This is text that is richer than ‘plain text’ by virtue of containing formatting information: **bold**, _italic_, ~~strikethrough~~, different fonts, headings, ordered lists, unordered lists, etc.

## History

Before the invention of word processing software, adding formatting to text documents meant using a markup language such as [TeX](https://en.wikipedia.org/wiki/TeX). In TeX, you format using commands: e.g. `\textit{this text is in italics}` would output "_this text is in italics_" — what you see while editing is different from what you get as the output. WYSIWYG (pronounced wiz-ee-wig) or "what you see is what you get" editors aim to make the appearance of the content inside the editor resemble the final product as accurately as possible, hiding the formatting code from the user and showing its actual effect instead.

![Magazine advertisement for WordStar.](./images/WordStar_ad.jpg 'This ad for WordStar makes a big deal of its ‘what you see is what you get’ features')

One of the first word processors to label itself as WYSIWYG was _WordStar_: priced at $495 + $50 for the manual[^1], version 1.0 was released in 1978. In WordStar, the user would apply formatting using 'Control codes'. For example, pressing `Ctrl + P` then `B` (or just `F4` if you were lucky enough to own a computer with function keys) would make the text bold. To move through the document, instead of using a mouse, you would use the diamond shaped formation of keys: `Ctrl + E`, `Ctrl + X`, `Ctrl + S`, and `Ctrl + D` to move the cursor up, down, left or right respectively[^2]. Calling WordStar a WYSIWYG editor is a stretch — the formatting visible on screen while editing is limited to line and page breaks. Bold and underline was still represented by inline commands like `^B` or `^Y`. Later versions added preview functionality so you could get a better idea of the layout of the printed page, but this would take you out of the editing mode.

Arriving soon after WordStar, _WordPerfect_ introduced some improvements to differentiate formatting on screen: displaying bold text brighter than regular text and rendering a line below underlined text.

![Magazine advertisement for Microsoft Word.](./images/Microsoft_Word_ad.jpg 'In a not-so-subtle dig at WordStar, this ad for Microsoft Word explains how it improves on existing WYSIWYG editors by showing formatting like bold, italic and underline on-screen')[^3]

The next major step in the world of WYSIWYG editing was enabled by the humble mouse; although first devised in the 1960s, it wasn't until the 1980s that mice started to gain popularity. In 1983 Microsoft announced both the _The Microsoft mouse_ ($195) and _Multi-Tool Word_ ($395), a word processor designed to take advantage of the new peripheral (Microsoft would quickly simplify the name to just ‘Word’)[^4]. The user no longer needed to type text commands to apply formatting but could instead use their mouse to navigate the Graphical User Interface (GUI), clicking on buttons and menus to apply specific formatting rules.

The year after the release of Microsoft Word, the Apple Macintosh was launched, which came bundled with Apple's new word processor, _MacWrite_. Although the feature set was rudimentary by today's standards, MacWrite had an intuitive mouse-based graphical user interface and boasted the ability to display different fonts and formatting during editing. MacWrite is often called the world's first WYSIWYG editor, although — as with many of Apple's greatest successes — it was based on someone else's idea; in this case a prototype piece of software developed at Xerox PARC (A research centre in Palo Alto, California). _Bravo_, developed in 1974, 10 whole years before the release of MacWrite, was probably the world's first WYSIWYG editor. You can hear Steve Jobs speak about his first encounter with a GUI at Xerox PARC in the film, _Triumph of the Nerds_[^5].

## WYSIWYG for the web

When the web began to be seen as a publishing platform, content writers, designers, and other non-programmers needed a tool to create web content without needing to learn HTML, the markup language of the web. The first WYSIWYG tool for building web pages, _WebMagic_, arrived in 1995 and was quickly followed by _FrontPage_ (purchased by Microsoft in 1996 for \$133million). These original tools were desktop applications you needed to purchase and install on your computer.

The rise of blogging around the turn of the millennium meant that a way of editing HTML content in the browser was needed. FCKeditor, later renamed to CKEditor (because "the FCK letters combined together are a shortcut for a bad word") and TinyMCE were the early pioneers in the world of browser-based editors. Web-based rich-text editors have now become the tool of choice (or necessity) for many content writers. Word Processing for print has also moved into the browser with software like Google Docs.

So how do rich text editors actually work? Most modern WYSIWYG editors now make use of the `contenteditable` html attribute introduced in Internet Explorer 5.5, that when set to `true`, allows the user to directly edit the content of an HTML element.

## Problems

Mainly due to the complexity of the task they're trying to do, rich text editors tend to have issues:

- As with all forms of WYSIWYG, the appearance of content in the editor is usually just an approximation of the final output. Unless you're applying the exact same styling to the editable content as the output, there are going to be visual discrepancies. Some implementations attempt to get around this issue with a ‘live preview’, showing a rendered version of the output alongside the editor which updates as you type.
- Making JavaScript-driven applications accessible is hard, especially when not appropriately prioritised and considered from the beginning of development. The new editor in WordPress 5.0, [Gutenberg](https://wordpress.org/gutenberg/), has been [plagued by accessibility problems](https://wptavern.com/wpcampus-gutenberg-accessibility-audit-finds-significant-and-pervasive-accessibility-problems).

## Libraries

Due to the complex logic required to build a rich text editor, it's rare for people to build one from scratch. It's usually best to find an existing example and adapt it to your needs. Here are some of the most popular libraries available today:

- **CKEditor:** First released in 2003, CKEditor was one of the earliest web-based WYSIWYG editors. It has constantly improved over the proceeding years and now includes comprehensive support for keyboard access and assistive technology. It also has a number of integrations with front-end frameworks such as React and Vue.
- TinyMCE

### Honourable mentions

- **Mozile**: The **Moz**illa **I**n**l**ine **E**ditor
- **Bitflux editor**: http://bitfluxeditor.mozdev.org/

You can view a pretty comprehensive list of WYSIWYG editors at the [Awesome WYSIWYG repo](https://github.com/JefMari/awesome-WYSIWYG).

## Alternatives to WYSIWYG

### HTML

HTML is _the_ markup language of the world wide web. Underneath the surface, it's what all rich text editors use.

### Markdown

Markdown is another markup language, but what sets it apart is the readability of its syntax. The goal behind markdown is that the formatting can be interpreted even in the original markup. It borrows heavily from existing conventions for marking up plain text in emails and online forums. e.g. `_italics_`, `**bold**`, `# Headings`, and starting lines with `>` to indicate a blockquote [^8]. Its simple design allows it to be converted to many output formats, not just HTML. Unfortunately while much of the Markdown syntax is intuitive, there are certain patterns that are definitely _not_: [the syntax for adding a link](https://daringfireball.net/projects/markdown/syntax#link) feels slightly arbitrary and is hard to remember; and adding markup that is not covered by Markdown’s syntax [requires the use of HTML](https://daringfireball.net/projects/markdown/syntax#html).

[^1]: [Word-Star](https://archive.org/stream/byte-magazine-1980-01#page/n49/mode/2up) BYTE (advertisement). January 1980. p. 49.

<!-- [^2]: [A Potted History of WordStar](https://web.archive.org/web/20130706022357/http://www.wordstar.org/index.php/wordstar-history) -->

[^2]: [WordStar: A writer’s word processor](https://arstechnica.com/information-technology/2017/03/wordstar-a-writers-word-processor/) _Robert J. Sawyer_
[^3]: [Micosoft Word](https://archive.org/stream/byte-magazine-1983-12/1983_12_BYTE_08-12_Easy_Software#page/n89/mode/2up) BYTE (advertisement). December 1983. p. 88-9.
[^4]: [Mouse and new WP program join Microsoft product lineup](https://books.google.co.uk/books?id=4S8EAAAAMBAJ&pg=PA10&redir_esc=y#v=onepage&q&f=false). 1983

<!-- [^5]: [WordStar vs. WordPerfect: a 'standard,' a challenger](https://www.csmonitor.com/1984/1107/110722.html) -->

[^5]: [Steve Jobs talks about his 1979 visit to Xerox PARC](https://player.vimeo.com/video/181839941)
[^6]: [Rebranding](https://web.archive.org/web/20081231055546/http://docs.fckeditor.net/FCKeditor_3.x/Design_and_Architecture/Rebranding) FCK Editor docs
[^7]: [Your WYSIWYG Editor sucks](https://rachelandrew.co.uk/archives/2011/07/27/your-WYSIWYG-editor-sucks/)
[^8]: [Markdown: Syntax](https://daringfireball.net/projects/markdown/syntax)

http://mozile.mozdev.org/index.html

<!-- prettier-ignore -->
<!-- *[WYSIWYG]: what you see is what you get -->
