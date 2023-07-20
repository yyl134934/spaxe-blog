import { Metadata, ResolvingMetadata } from 'next';
import SearchLayout from '@/layout/SearchLayout/SearchLayout';
import siteMetadata from '@/data/siteMetadata';

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: '全部文章 - 213号',
    description: `全部文章- ${siteMetadata.description} - ${siteMetadata.author}`,
  };
}

export default function Blog() {
  return <SearchLayout pageProps={{ title: '全部文章' }}></SearchLayout>;
}
