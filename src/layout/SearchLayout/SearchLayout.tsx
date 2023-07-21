'use client';
import useSWRInfinite from 'swr/infinite';
import PostLayout from '@/layout/PostLayout';
import { Post } from '@/entity/Common';
import { useSearch } from './hooks';
import { ResponseData } from '@/entity/Response';
import dynamic from 'next/dynamic';

const MoreLoad = dynamic(() => import('@/components/MoreLoad'), { ssr: false });

type SearchLayoutProps = {
  children?: React.ReactNode;
  pageProps?: {
    title?: string;
    path?: string;
    initialKeyword?: string;
  };
};

const getSearch = (obj: Record<string, any>) => {
  const isUseful = (value: any) => !(value === null || value === undefined || value === '');
  const query = Object.entries(obj)
    .filter(([_, value]) => isUseful(value))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `?${query}`;
};

const hasNextPage = (size: number, data: ResponseData<Post>[], offset = 5) => {
  const lastPage = data[data.length - 1] ?? [];
  return lastPage.data?.length < offset || size > data.length;
};

/**
 *  一个函数，拿到每个页面的 key，
 * `fetcher` 接受它的返回值。
 * 如果返回是 `null`，该页面不会开始请求。
 * @param searchKeyword
 * @returns
 */
const getKey = (searchKeyword: string) => (pageIndex: number, previousPageData: ResponseData<Post>) => {
  const offset = '5';
  if (pageIndex !== 0 && (!previousPageData || previousPageData.data?.length < offset)) {
    return null;
  }
  const search = getSearch({ search: searchKeyword, page: pageIndex + 1, offset });
  return `${search}`;
};

const fetcher = async (search: string): Promise<ResponseData<Post>> => {
  const { host, protocol } = window?.location;
  const pathname = 'api/getPostData';
  const res = await fetch(`${protocol}//${host}/${pathname}${search}`);
  return res.json();
};

export default function SearchLayout({ children, pageProps }: SearchLayoutProps) {
  const { initialKeyword: initial, ...rest } = pageProps ?? { initialKeyword: '' };
  const { keyword: searchKeyword, onSearch } = useSearch(initial);

  const options = {
    initialSize: 1, //最初应加载的页面数量
    revalidateAll: false, //始终尝试重新验证所有页面
    revalidateFirstPage: false, //始终尝试重新验证第一页
    persistSize: false, //当第一页的 key 发生变化时，不将 page size（或者 initialSize 如果设置了该参数）重置为 1
  };
  const { data = [], size, setSize } = useSWRInfinite(getKey(searchKeyword), fetcher, options);
  const summaryData = data.reduce((acc, cur) => acc.concat(cur.data as Post), [] as Post[]);
  const isEnd = hasNextPage(size, data);

  const handleNext = () => {
    setSize(size + 1);
  };

  return (
    <PostLayout pageProps={{ data: summaryData as Post[], onSearch, ...rest }}>
      {children}
      {summaryData.length === 0 ? null : <MoreLoad handleNext={handleNext} isEnd={isEnd} />}
    </PostLayout>
  );
}
