import { Metadata, ResolvingMetadata } from 'next';
import SearchLayout from '@/layout/SearchLayout/SearchLayout';

// export function generateStaticParams() {
//   const tags = getTagsData();

//   return Object.keys(tags).map((tag) => ({ params: { tag: tag } }));
// }

export async function generateMetadata(
  { params, searchParams }: { params: { tag: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const decodeTag = decodeURIComponent(params?.tag).toLocaleUpperCase();
  return {
    title: `${decodeTag} - 213号`,
  };
}

export default function TagAbout({ params }: { params: { tag: string } }) {
  const decodeTag = decodeURIComponent(params?.tag).toLocaleUpperCase();

  return <SearchLayout pageProps={{ params: params?.tag, title: decodeTag, path: '../blog' }}></SearchLayout>;
}
