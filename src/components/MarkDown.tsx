import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
// 表格、下划线、超链接等
import remarkGfm from 'remark-gfm';
// 目录
import rehypeToc from '@jsdevtools/rehype-toc'; //目录生成
import rehypeSlug from 'rehype-slug'; //目录导航
//代码高亮
import rehypeHighlight from 'rehype-highlight'; //代码高亮
// 代码高亮——语言包
import javascript from 'highlight.js/lib/languages/javascript'; //代码高亮
import typescript from 'highlight.js/lib/languages/typescript'; //代码高亮
// 转html
import rehypeStringify from 'rehype-stringify';
// 代码高亮——样式
import 'highlight.js/styles/atom-one-dark.css';
import './MarkDwon.css';

const Markdown = ({ content }: { content: string }) => {
  const processedContent = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeSlug)
    .use(rehypeToc, {
      cssClasses: {
        toc: 'markdown-toc-outline', // Change the CSS class for the TOC
        list: 'markdown-toc-list', // Change the CSS class for links in the list
        link: 'markdown-toc-link', // Change the CSS class for links in the link
      },
    })
    .use(rehypeHighlight, { languages: { javascript, typescript } })
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  return <div className='markdown' dangerouslySetInnerHTML={{ __html: processedContent }} />;
};

export default Markdown;
