import { Post, Summary } from '@/entity/Common';
import dynamic from 'next/dynamic';

const List = dynamic(() => import('@/components/list/List'));
const ListItem = dynamic(() => import('@/components/list/ListItem'));

interface PostLayoutProps {
  children?: React.ReactNode;
  pageProps?: {
    title?: string;
    isHome?: boolean;
    description?: string;
    data: Summary[];
    onSearch?: (e: any) => void;
    path?: string;
  };
}

export default function PostLayout({ children, pageProps }: PostLayoutProps) {
  const renderList = () => {
    return (
      <List isHome={pageProps?.isHome}>
        {pageProps?.data.map((post: Summary) => (
          <ListItem post={post} key={post?.id} path={pageProps?.path} isHome={pageProps?.isHome} />
        ))}
      </List>
    );
  };

  return (
    <div>
      <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          {pageProps?.title}
        </h1>
        <div className='relative max-w-lg'>
          {pageProps?.isHome ? (
            <div className='text-lg leading-8 text-gray-500 dark:text-gray-400'>{pageProps?.description}</div>
          ) : (
            <>
              <input
                className=' focus-visible:outline-primary-500 focus-visible:ring-primary-500 block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
                aria-label='Search articles|搜索文章'
                type='text'
                placeholder='搜索文章'
                onChange={pageProps?.onSearch}
              />
              <svg
                className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </>
          )}
        </div>
      </div>
      {renderList()}
      {children}
    </div>
  );
}
