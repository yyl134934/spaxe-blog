import PostLayout from '@/components/PostLayout';
import PostList from '@/components/PostList';
import { Post } from '@/entity/Common';
import { getTagsData } from '@/lib/posts';
import { debounce } from '@/utils/debounce';
import { Metadata, ResolvingMetadata } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

export function generateStaticParams() {
  const tags = getTagsData();

  return Object.keys(tags).map((tag) => ({ params: { tag: tag } }));
}

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
  return <PostLayout pageProps={{ params: params?.tag, title: decodeTag }}></PostLayout>;
}
