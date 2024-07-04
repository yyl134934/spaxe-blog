'use client';
import PostLayout from '@/layout/PostLayout';
import { Post } from '@/entity/Common';
import { usePostsQuery, useSearch } from './hooks';
import dynamic from 'next/dynamic';

const MoreLoad = dynamic(() => import('@/components/MoreLoad'), { ssr: false });

interface SearchLayoutProps {
  children?: React.ReactNode;
  pageProps?: {
    title?: string;
    path?: string;
    tag?: string;
  };
}

export default function SearchLayout({ children, pageProps }: SearchLayoutProps) {
  const { tag, ...rest } = pageProps ?? { initialKeyword: '' };
  const { keyword: searchKeyword, onSearch } = useSearch();

  const { summaryData, setSize, isEnd, isLoading } = usePostsQuery({ search: searchKeyword, tag });

  const handleNext = () => {
    setSize((prevSize) => prevSize + 1);
  };

  return (
    <PostLayout pageProps={{ data: summaryData as Post[], onSearch, ...rest }}>
      {children}
      {summaryData.length === 0 ? null : <MoreLoad handleNext={handleNext} isEnd={isEnd} isLoading={isLoading} />}
    </PostLayout>
  );
}
