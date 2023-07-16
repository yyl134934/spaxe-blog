'use client';
import { usePathname } from 'next/navigation';
import { Post } from '@/entity/Common';
import Link from 'next/link';
import Tag from './Tag';

const ListItem = ({ post, isHome }: { post: Post; isHome?: boolean }) => {
  const pathname = usePathname();
  const redirectPath = (subPath = '') => {
    return pathname === '/' ? `blog/${subPath}` : `../blog/${subPath}`;
  };

  return (
    <div className={(isHome ? 'py-12' : 'py-4') + ' flex flex-col sm:flex-row'}>
      <div className='w-64 min-w-sm'>
        <p className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400 min-w-full'>
          {post.date}
        </p>
      </div>

      <div className='space-y-5 xl:col-span-3 overflow-hidden'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold leading-8 tracking-tight my-0'>
            <Link href={redirectPath(post?.id)}>{post?.title}</Link>
          </h2>

          <div className='flex flex-wrap m-0'>
            {post?.tags?.split(',').map((tag) => (
              <Tag key={`${post?.id} ${tag}`} tag={tag} />
            ))}
          </div>
        </div>
        <p title={post?.description} className='text-gray-500 dark:text-gray-400 mt-6 truncate'>
          {post?.description}
        </p>
        <div className='text-base font-medium leading-6'>
          {isHome ? (
            <Link
              className=' text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
              href={redirectPath(post?.id)}
            >
              阅读更多→
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

const List = ({ postsData, isHome }: { postsData: Post[]; isHome?: boolean }) => {
  return (
    <div
      className={
        (isHome ? 'divide-y divide-gray-200' : '') +
        ' dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700'
      }
    >
      {postsData.map((post) => (
        <ListItem isHome={isHome} post={post} key={post?.id} />
      ))}
    </div>
  );
};

export default List;
