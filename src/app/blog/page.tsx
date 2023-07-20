import { Metadata, ResolvingMetadata } from 'next';
import SearchLayout from '@/layout/SearchLayout/SearchLayout';

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: '全部文章 - 213号',
  };
}

export default function Blog() {
  return <SearchLayout pageProps={{ title: '全部文章' }}></SearchLayout>;
}
