import { getAllPostIds, getAdjacentPostData, getPostDataById } from '@/lib/posts';
import React from 'react';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import MarkDownLoading from '@/components/MarkDownLoading';

const MarkDown = dynamic(() => import('@/components/MarkDown'), {
  loading: () => <MarkDownLoading />,
});

const Author = dynamic(() => import('@/components/Author'), {});
const ScrollTop = dynamic(() => import('@/components/ScrollToTop'), {});
const Tag = dynamic(() => import('@/components/Tag'), {});

export function generateStaticParams() {
  const allPostIds = getAllPostIds();

  return allPostIds.map((id) => ({ params: { slug: id } }));
}

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { title } = getPostDataById(params.slug);
  return {
    title: title,
  };
}

export default function PostDetails({ params }: { params: { slug: string } }) {
  const currentPostData = getPostDataById(params.slug);
  const { date, title, content, tags, author, name, github } = currentPostData;
  const [prevPostData, nextPostData] = getAdjacentPostData(currentPostData);

  return (
    <div className='block  xl:flex flex-row-reverse'>
      <ScrollTop />

      <article className='xl:mb-6 xl:max-w-3xl flex-grow'>
        <div className='space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700'>
          <div className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
            {date}
          </div>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
            {title}
          </h1>
          <Author className='flex xl:hidden' author={{ name, github }} />
        </div>
        <div>
          <MarkDown content={content} />
        </div>
      </article>

      <footer className='xl:pr-8 divide-y-0 divide-x-0'>
        <Author className='hidden xl:flex' author={{ name, github }} />
        <div>
          {tags ? (
            <div className='py-4 xl:py-8'>
              <div className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
                标签
              </div>
              <div className='flex flex-row flex-wrap'>
                {tags.split(',').map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
        <div className='flex flex-row justify-between py-4 xl:block xl:space-y-8 xl:py-8'>
          <div className='flex flex-col justify-start'>
            <div className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              上一篇
            </div>
            {prevPostData ? (
              <Link
                className=' text-primary-500 hover:text-primary-600'
                href={`${prevPostData?.id}`}
              >
                {prevPostData.title}
              </Link>
            ) : (
              '无'
            )}
          </div>
          <div className='flex flex-col justify-start'>
            <div className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>
              下一篇
            </div>
            {nextPostData ? (
              <Link
                className=' text-primary-500 hover:text-primary-600'
                href={`${nextPostData?.id}`}
              >
                {nextPostData.title}
              </Link>
            ) : (
              '无'
            )}
          </div>
        </div>
        <Link className='py-4 text-primary-500 hover:text-primary-600' href={`/`}>
          ← 返回
        </Link>
      </footer>
    </div>
  );
}
