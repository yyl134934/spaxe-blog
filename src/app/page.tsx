import PostList from '@/components/PostList';
import { getSortedPostsData } from '@/lib/posts';
import '@/styles/main.css';

export default function Home() {
  const postsData = getSortedPostsData();
  console.log('🚀🐍 ~ file: page.tsx:7 ~ Home ~ postsData.length:', postsData.length);
  return (
    <div>
      <div className='w-screen max-w-5xl py-6'>
        <div className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          Latest
        </div>
        <div className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
          A blog created with Next.js and Tailwind.css
        </div>
      </div>
      <PostList postsData={postsData}></PostList>
    </div>
  );
}
