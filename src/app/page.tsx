import dynamic from 'next/dynamic';
import PostLayout from '@/layout/PostLayout';
import { fetcher } from '@/utils/fetch';
import { Summary } from '@/entity/Common';

const Link = dynamic(() => import('@/components/Link'));

export const runtime = 'edge';

export default async function Home() {
  const { data = [] } = await fetcher<Summary>('api/postList', { cache: 'force-cache' });

  return (
    <PostLayout pageProps={{ data: data, isHome: true, title: '最近更新', description: '近几个月来的更新' }}>
      <div className='flex justify-end py-4'>
        <Link href={'blog'}>全部文章 →</Link>
      </div>
    </PostLayout>
  );
}
