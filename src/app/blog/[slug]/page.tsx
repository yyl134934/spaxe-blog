import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getAllPostIds, getNeighbors, getPostDataById } from '@/lib/posts';
import MarkDownLoading from '@/components/markdown/Loading';
import siteMetadata from '@/data/siteMetadata';
import { fetcher } from '@/utils/fetch';
import { Post, Summary } from '@/entity/Common';

const Link = dynamic(() => import('@/components/Link'));
const MarkDown = dynamic(() => import('@/components/markdown/MarkDown'), {
  loading: () => <MarkDownLoading />,
});
const Author = dynamic(() => import('@/components/Author'), {});
const ScrollTop = dynamic(() => import('@/components/ScrollToTop'), {});
const Tag = dynamic(() => import('@/components/Tag'), {});

// export function generateStaticParams() {
//   const allPostIds = getAllPostIds();

//   return allPostIds.map((id) => ({ params: { slug: id } }));
// }

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data } = await fetcher<Post>(`api/postDetails?slug=${params.slug}`, {
    caches: 'force-cache',
  });

  const currentPostData = data?.[0];

  return {
    title: currentPostData?.title ?? '404',
    description: ` ${currentPostData?.title}-${params.slug}-${currentPostData?.tags}-${currentPostData?.description}-${siteMetadata.author}`,
  };
}

export default async function PostDetails({ params }: { params: { slug: string } }) {
  const { data: [currentPostData] = [] } = await fetcher<Post>(`api/postDetails?slug=${params.slug}`, {
    caches: 'force-cache',
  });

  if (!currentPostData) {
    notFound();
  }

  const { date, title, content, tags, author, name, github, id } = currentPostData;
  const { data: [prevPostData, nextPostData] = [] } = await fetcher<Summary>(`api/postNeighbors?cur_id=${id}`, {
    caches: 'force-cache',
  });

  return (
    <div>
      <ScrollTop />

      <article className='flex-grow'>
        <div className='xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'>
          <header className='pt-6 xl:pb-6'>
            <div className='space-y-1 text-center'>
              <dl className='space-y-10'>
                <div>
                  <dt className='sr-only'>Published on</dt>
                  <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>{date}</dd>
                </div>
              </dl>
              <div>
                <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14'>
                  {title}
                </h1>
              </div>
            </div>
          </header>

          <div
            className='divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0'
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <Author author={{ name, github }} />
            <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0'>
              <MarkDown content={content} />
            </div>
            <footer>
              <div className='divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y'>
                {tags ? (
                  <div className='py-4 xl:py-8'>
                    <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>标签</h2>
                    <div className='flex flex-row flex-wrap'>
                      {tags.split(',').map((tag) => (
                        <Tag key={tag} tag={tag} />
                      ))}
                    </div>
                  </div>
                ) : null}
                <div className='flex flex-row justify-between py-4 xl:block xl:space-y-8 xl:py-8'>
                  <div className='flex flex-col justify-start'>
                    <div className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>上一篇</div>
                    {prevPostData ? <Link href={`${prevPostData?.id}`}>{prevPostData.title}</Link> : '无'}
                  </div>
                  <div className='flex flex-col justify-start'>
                    <div className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>下一篇</div>
                    {nextPostData ? <Link href={`${nextPostData?.id}`}>{nextPostData.title}</Link> : '无'}
                  </div>
                </div>
              </div>

              <div className='pt-4 xl:pt-8'>
                <Link href={`/`}>← 返回</Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
}
