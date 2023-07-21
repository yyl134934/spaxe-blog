import dynamic from 'next/dynamic';
import PostLayout from '@/layout/PostLayout';
import { getPostDataOfPagination } from '@/lib/posts';

const Link = dynamic(() => import('@/components/Link'));

export default function Home() {
  const { data } = getPostDataOfPagination();
  return (
    <PostLayout pageProps={{ data: data, isHome: true, title: '最近更新', description: '近几个月来的更新' }}>
      <div className='flex justify-end py-4'>
        <Link href={'blog'}>全部文章 →</Link>
      </div>
    </PostLayout>
  );
}
