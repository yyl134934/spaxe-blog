import PostLayout from '@/components/PostLayout';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: '全部文章 - 213号',
  };
}

export default function Blog() {
  return <PostLayout pageProps={{ title: '全部文章' }}></PostLayout>;
}
