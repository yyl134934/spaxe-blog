'use client';
import PostLayout from '@/layout/PostLayout';
import { Metadata, ResolvingMetadata } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { Post } from '@/entity/Common';
import { getTagsData } from '@/lib/posts';
import { debounce } from '@/utils/debounce';

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

const fetcher = async (keyword: string) => {
  const { host, protocol } = window?.location;
  const res = await fetch(`${protocol}//${host}/${keyword}`, { cache: 'no-store' });
  return res.json();
};

type Search = {
  keyword: string;
  onSearch: (e: any) => void;
};

const useSearch = (initail = ''): Search => {
  const [keyword, setKeyword] = useState(initail);

  const throttleFn = debounce((value) => {
    setKeyword(value);
  }, 500);

  const handleChange = (e: any) => {
    const { value }: { value: string } = e.target;
    const regex = /[^\u4e00-\u9fa5a-zA-Z0-9]/g;
    const valuableStr = value.trim().replace(regex, '');

    throttleFn(valuableStr);
  };

  return { keyword: keyword, onSearch: handleChange };
};

export default function TagAbout({ params }: { params: { tag: string } }) {
  const { keyword, onSearch } = useSearch(params?.tag);

  const decodeTag = decodeURIComponent(params?.tag).toLocaleUpperCase();

  const queryParams = keyword ? `?search=${keyword}` : '';
  const { data: { data: postsData = [] } = { data: [] as Post[] } } = useSWR(`api/getPostData${queryParams}`, fetcher, {
    revalidateOnMount: true,
  });

  return (
    <PostLayout
      pageProps={{ data: postsData, onSearch, params: params?.tag, title: decodeTag, path: '../blog' }}
    ></PostLayout>
  );
}
