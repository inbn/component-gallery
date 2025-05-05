import { unified } from "unified";
import rehypeStringify from "rehype-stringify";
import remarkAbbr from "@richardtowers/remark-abbr";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";

export const parseMarkdown = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(remarkAbbr)
    .use(remarkRehype, {
      handlers: {
        abbrDefinition: () => undefined,
      },
    })
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
};
