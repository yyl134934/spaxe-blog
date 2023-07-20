import { getTagsData } from '@/lib/posts';
import { Metadata, ResolvingMetadata } from 'next';
import siteMetadata from '@/data/siteMetadata';
import dynamic from 'next/dynamic';

const Link = dynamic(() => import('@/components/Link'));

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: `标签 - ${siteMetadata.author}`,
    description: `标签- ${siteMetadata.description} - ${siteMetadata.author}`,
  };
}

function Tags() {
  const tagsData = getTagsData();

  return (
    <div className='flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0'>
      <div className='space-x-2 pt-6 pb-8 md:space-y-5 '>
        <span className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14'>
          标签
        </span>
      </div>
      <div className='flex max-w-lg flex-wrap'>
        {Object.entries(tagsData).map(([tag, times]) => (
          <Link key={tag} href={`/tags/${tag}`} className='mt-2 mb-2 mr-5'>
            <span className='mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
              {tag}
            </span>
            <span className='-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300'>{`(${times})`}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default Tags;
