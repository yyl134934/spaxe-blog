'use client';
import { Metadata, ResolvingMetadata } from 'next';
import useSWR from 'swr';
import PostLayout from '@/layout/PostLayout';
import { Post } from '@/entity/Common';
import { debounce } from '@/utils/debounce';
import { useState } from 'react';

export async function generateMetadata(
  { params, searchParams }: { params: { slug: string }; searchParams: any },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: '全部文章 - 213号',
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

const useSearch = (): Search => {
  const [keyword, setKeyword] = useState('');

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

export default function Blog() {
  const { keyword, onSearch } = useSearch();

  const params = keyword ? `?search=${keyword}` : '';
  const { data: { data: postsData = [] } = { data: [] as Post[] } } = useSWR(`api/getPostData${params}`, fetcher, {
    revalidateOnMount: true,
  });

  return <PostLayout pageProps={{ data: postsData, onSearch, title: '全部文章' }}></PostLayout>;
}
