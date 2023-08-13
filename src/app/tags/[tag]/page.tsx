import { Metadata, ResolvingMetadata } from 'next';
import SearchLayout from '@/layout/SearchLayout/SearchLayout';
import siteMetadata from '@/data/siteMetadata';
import { fetcher } from '@/utils/fetch';

export async function generateStaticParams() {
  const TAGS_PATH = 'api/tags';
  const tags = fetcher(TAGS_PATH, { cache: 'force-cache' });

  return Object.keys(tags).map((tag) => ({ params: { tag: tag } }));
}

export async function generateMetadata(
  { params, searchParams }: { params: { tag: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const decodeTag = decodeURIComponent(params?.tag).toLocaleUpperCase();
  return {
    title: `${decodeTag} - ${siteMetadata.author}`,
    description: `${decodeTag} - ${siteMetadata.description} - ${siteMetadata.author}`,
  };
}

export default function TagAbout({ params }: { params: { tag: string } }) {
  const decodeTag = decodeURIComponent(params?.tag).toLocaleUpperCase();
  return <SearchLayout pageProps={{ tag: params?.tag, title: decodeTag, path: '../blog' }}></SearchLayout>;
}
