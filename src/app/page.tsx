import PostLayout from '@/layout/PostLayout';
import { getSortedPostsData } from '@/lib/posts';

export default function Home() {
  const postsData = getSortedPostsData();

  return (
    <PostLayout pageProps={{ data: postsData, isHome: true, title: '最近更新', description: '近几个月来的更新' }} />
  );
}
