'use client';
import useSWR from 'swr';
import PostLayout from '@/layout/PostLayout';
import { Post } from '@/entity/Common';
import { useSearch } from './hook';

type SearchLayoutProps = {
  children?: React.ReactNode;
  pageProps?: {
    title?: string;
    path?: string;
    params?: string;
  };
};

const fetcher = async (keyword: string) => {
  const { host, protocol } = window?.location;
  const res = await fetch(`${protocol}//${host}/${keyword}`, { cache: 'no-store' });
  return res.json();
};

export default function SearchLayout({ children, pageProps }: SearchLayoutProps) {
  const { keyword, onSearch } = useSearch();

  const params = keyword ? `?search=${keyword}` : '';
  const { data: { data: postsData = [] } = { data: [] as Post[] } } = useSWR(`api/getPostData${params}`, fetcher, {
    revalidateOnMount: true,
  });

  return (
    <PostLayout {...pageProps} pageProps={{ data: postsData, onSearch }}>
      {children}
    </PostLayout>
  );
}
