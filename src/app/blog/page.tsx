import PostList from '@/components/PostList';
import { getSortedPostsData } from '@/lib/posts';
import '@/styles/main.css';

export default function Blog() {
  const postsData = getSortedPostsData();
  console.log('🚀🐍 ~ file: page.tsx:7 ~ Blog ~ postsData.length:', postsData.length);
  return (
    <div>
      <div className='w-screen max-w-5xl py-6 space-y-2'>
        <div className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          All Posts
        </div>
        <div className='relative max-w-lg'>
          <input
            className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
            aria-label='Search articles'
            type='text'
            placeholder='Search articles'
          />
        </div>
      </div>
      <PostList postsData={postsData}></PostList>
    </div>
  );
}
