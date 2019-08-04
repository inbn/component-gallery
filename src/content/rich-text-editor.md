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

The rise of blogging services around the turn of the millennium meant that a way of editing HTML content in the browser was needed. Some of the earliest browser-based rich text editors include: [Mozile](http://mozile.mozdev.org/index.html) (the **Moz**illa **I**n**l**ine **E**ditor); [Bitflux editor](http://bitfluxeditor.mozdev.org/); FCKeditor, later renamed to [CKEditor](https://ckeditor.com/) (because "the FCK letters combined together are a shortcut for a bad word") and [TinyMCE](https://www.tiny.cloud/). Web-based rich-text editors have now become the tool of choice (or necessity) for many content writers. Word Processing for print has also moved into the browser with software like Google Docs.

So how do rich text editors actually work? Most modern WYSIWYG editors now make use of the `contenteditable` html attribute introduced in Internet Explorer 5.5, that when set to `true`, allows the user to directly edit the content of an HTML element.

## Problems

Mainly due to the complexity of the task they're trying to achieve, rich text editors tend to have issues, and over the years they have had their fair share of detractors[^6][^7].

### Security

As is the case any time that a website accepts user input, you've got to assume some of your users have malicious intent; if not you're opening yourself up to all sorts of exploits including, but not limited to: [Cross-site request forgery](https://en.wikipedia.org/wiki/Cross-site_request_forgery), [SQL injection](https://en.wikipedia.org/wiki/SQL_injection), and [Local/Remote File inclusion](https://en.wikipedia.org/wiki/File_inclusion_vulnerability).

If you're showing user input to other users (e.g. displaying the output of a WYSIWYG as comments under an article), there's a whole new category of threat: Cross-Site Scripting (XSS) attacks. An XSS attack is where JavaScript gets injected into a webpage on an otherwise trusted website, unknown to the end user or owner of the website. This risk of XSS attacks can be minimised my filtering (or _sanitizing_) the user input before it’s stored or shown to anyone else — this is a process that involves stripping out everything but an explicitly allowed set of characters, HTML tags and attributes — [Here's a handy list of rules for preventing XSS](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.md). If you're not sanitizing user input, you're gonna have a bad time.

### Loss of control over design

WYSIWYG editors take decisions usually made by designers and hands them to the content editor. Although it is possible to lock down users' options to limit what they can do, rich text editors often ship with a very generous default configuration. It is also uncommon for a rich text editor to reliably enforce semantic best practices such as always including relevant alt attributes on images and using correctly ordered levels for headings.

### Is WYS WYG?

As with all forms of WYSIWYG, the appearance of content in a rich text editor is usually just an approximation of the final output. Unless you're applying the exact same CSS (and JS) to the editable content as the output, there are going to be visual discrepancies. Some implementations attempt to get around this issue with a ‘live preview’, showing a rendered version of the output alongside the editor which updates as you type.

### Copying and pasting from Word

When a user copies formatted text from one program to another, they generally expect formatting to be retained; but pasting text from one rich text format to another _entirely different_ rich text format is not a simple task. It often results in bloated markup filled with `&nbsp;` characters and unnecessary HTML elements.

### Accessibility

Making JavaScript-driven applications accessible requires work, especially when accessibility is not seen as a key requirement from the beginning of development. The new editor in WordPress 5.0, [Gutenberg](https://wordpress.org/gutenberg/), has been [plagued by accessibility problems](https://wptavern.com/wpcampus-gutenberg-accessibility-audit-finds-significant-and-pervasive-accessibility-problems).

## Libraries

Due to the complex logic required to build a rich text editor, I'd highly recommend _not_ attempting to build one from scratch. It's usually best to find an existing example and adapt it to your needs. Here are some of the most popular libraries available today:

- **[CKEditor](https://ckeditor.com/):** First released in 2003, CKEditor was one of the earliest web-based WYSIWYG editors. It has constantly improved over the proceeding years adding features such as a special ‘[paste from Word](https://ckeditor.com/docs/ckeditor4/latest/examples/pastefromword.html)’ plugin and comprehensive support for keyboard access and assistive technology. It also has a number of integrations with front-end frameworks such as React and Vue.
- **[Quill](https://quilljs.com/)** is a modern editor which uses its own document model, [parchment](https://github.com/quilljs/parchment/), an abstraction layer that sits parallel to the DOM (Document Object Model).
- **[ProseMirror](https://prosemirror.net/)** brands itself as "A toolkit for building rich-text editors on the web"; not really WYSIWYG editor as such, it is more a collection of modules for building your own. Similar to Quill, the document itself is abstracted into a custom data structure. Immensely powerful but definitely not a simple drop-in solution.

You can view a pretty comprehensive list of WYSIWYG editors at the [Awesome WYSIWYG repo](https://github.com/JefMari/awesome-WYSIWYG).

## Alternatives to WYSIWYG

### HTML

HTML is _the_ markup language of the world wide web. Underneath the surface, it's what most rich text editors will output and it's also relatively easy to learn.

### Markdown

Markdown is another markup language, but what sets it apart is the readability of its syntax. The goal behind markdown is that the formatting can be interpreted even in the original markup. It borrows heavily from existing conventions for marking up plain text in emails and online forums. e.g. `_italics_`, `**bold**`, `# Headings`, and starting lines with `>` to indicate a blockquote [^8]. Its simple design allows it to be converted to many output formats, not just HTML. Unfortunately while much of the Markdown syntax is intuitive, there are certain patterns that are definitely _not_: [the syntax for adding a link](https://daringfireball.net/projects/markdown/syntax#link) feels slightly arbitrary and is hard to remember; and adding markup that is not covered by Markdown’s syntax [requires the use of HTML](https://daringfireball.net/projects/markdown/syntax#html). See also: [Textile](https://textile-lang.com/), a precursor to Markdown with some syntax in common.

## Conclusion

In some cases it's inevitable that a rich text editor is the best, or only, tool for the job. There are also other times where an alternative, such as Markdown or even plain text is a better (and simpler to implement) solution. My advice is to try a few libraries and choose the one that works best for _your_ application and _your_ users; lock down the formatting options to only the bare minimum of what is necessary; and **_always_** filter the output.

[^1]: [Word-Star](https://archive.org/stream/byte-magazine-1980-01#page/n49/mode/2up) BYTE (advertisement). January 1980. p. 49.

<!-- [^2]: [A Potted History of WordStar](https://web.archive.org/web/20130706022357/http://www.wordstar.org/index.php/wordstar-history) -->

[^2]: [WordStar: A writer’s word processor](https://arstechnica.com/information-technology/2017/03/wordstar-a-writers-word-processor/) _Robert J. Sawyer_
[^3]: [Micosoft Word](https://archive.org/stream/byte-magazine-1983-12/1983_12_BYTE_08-12_Easy_Software#page/n89/mode/2up) BYTE (advertisement). December 1983. p. 88-9.
[^4]: [Mouse and new WP program join Microsoft product lineup](https://books.google.co.uk/books?id=4S8EAAAAMBAJ&pg=PA10&redir_esc=y#v=onepage&q&f=false). 1983

<!-- [^5]: [WordStar vs. WordPerfect: a 'standard,' a challenger](https://www.csmonitor.com/1984/1107/110722.html) -->

[^5]: [Steve Jobs talks about his 1979 visit to Xerox PARC](https://player.vimeo.com/video/181839941)
[^6]: [Your WYSIWYG Editor sucks](https://rachelandrew.co.uk/archives/2011/07/27/your-wysiwyg-editor-sucks/) _Rachel Andrew_
[^7]: [What’s wrong with WYSIWYG](https://www.adamhyde.net/whats-wrong-with-wysiwyg/) _Adam Hyde_

<!-- [^6]: [Rebranding](https://web.archive.org/web/20081231055546/http://docs.fckeditor.net/FCKeditor_3.x/Design_and_Architecture/Rebranding) FCK Editor docs -->
<!-- [^7]: [Your WYSIWYG Editor sucks](https://rachelandrew.co.uk/archives/2011/07/27/your-WYSIWYG-editor-sucks/) -->

[^8]: [Markdown: Syntax](https://daringfireball.net/projects/markdown/syntax)

<!-- prettier-ignore -->
<!-- *[WYSIWYG]: what you see is what you get -->
