import Loading from '@/components/Loading';
import { getSortedPostsData } from '@/lib/posts';
import dynamic from 'next/dynamic';

const PostList = dynamic(() => import('@/components/PostList'), {
  loading: () => <Loading />,
});

export default function Home() {
  const postsData = getSortedPostsData();
  return (
    <div>
      <div className='space-y-2 pt-6 pb-8 md:space-y-5'>
        <div className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          <span>最近更新</span>
        </div>
        <div className='text-lg leading-7 text-gray-500 dark:text-gray-400'>近几个月来的更新</div>
      </div>
      <PostList isHome={true} postsData={postsData}></PostList>
    </div>
  );
}
