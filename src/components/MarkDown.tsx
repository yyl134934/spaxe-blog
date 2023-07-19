'use client';
import React from 'react';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
// 表格、下划线、超链接等
import remarkGfm from 'remark-gfm';
// 目录
import rehypeToc from '@jsdevtools/rehype-toc'; //目录生成
import rehypeSlug from 'rehype-slug'; //目录导航
//代码
// import remarkCodeTitles from '@/utils/remark-code-title'; //代码标题
import rehypeHighlight from 'rehype-highlight'; //代码高亮
import clipboard from '@/utils/clipboard-plugin'; //代码复制
import useClipboard from './useClipboard'; //代码复制
// 代码高亮——语言包
import javascript from 'highlight.js/lib/languages/javascript'; //javascript代码高亮
import typescript from 'highlight.js/lib/languages/typescript'; //typescript代码高亮
// 转html
import rehypeStringify from 'rehype-stringify';
// 代码高亮——样式
import 'highlight.js/styles/atom-one-dark.css';
import './MarkDwon.css';

const Markdown = ({ content }: { content: string }) => {
  const processedContent = unified()
    .use(remarkParse)
    // .use(remarkCodeTitles)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeSlug)
    .use(rehypeToc, {
      cssClasses: {
        toc: 'markdown-toc-outline', // Change the CSS class for the TOC
        list: 'markdown-toc-list', // Change the CSS class for links in the list
        listItem: 'markdown-toc-item', // Change the CSS class for links in the listItem
        link: 'markdown-toc-link', // Change the CSS class for links in the link
      },
    })
    .use(clipboard)
    .use(rehypeHighlight, { languages: { javascript, typescript } })
    .use(rehypeStringify)
    .processSync(content)
    .toString();

  useClipboard();
  return (
    <div className='markdown prose dark:prose-dark max-w-none' dangerouslySetInnerHTML={{ __html: processedContent }} />
  );
};

export default Markdown;
