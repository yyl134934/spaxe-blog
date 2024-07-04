import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';
import { ResponseData } from '@/entity/Response';

const hasNotNextPage = <T>(size: number, data: ResponseData<T>[], offset = 5) => {
  const lastPage = data[data.length - 1] ?? [];
  return lastPage.data?.length < offset || size > data.length;
};

const getSearch = (obj: Record<string, any>) => {
  const isUseful = (value: any) => !(value === null || value === undefined || value === '');
  const query = Object.entries(obj)
    .filter(([_, value]) => isUseful(value))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return query;
};

/**
 *  一个函数，拿到每个页面的 key，
 * `fetcher` 接受它的返回值。
 * 如果返回是 `null`，该页面不会开始请求。
 * @param searchKeyword
 * @returns
 */
const getKey =
  <T>(queryParams: Record<string, any> = {}) =>
  (pageIndex: number, previousPageData: ResponseData<T>) => {
    const offset = 5;
    if (pageIndex !== 0 && (!previousPageData || previousPageData.data?.length < offset)) {
      return null;
    }
    return getSearch({ ...queryParams, page: pageIndex + 1, offset });
  };

const fetcher =
  <T>(pathname: string) =>
  async (search: string): Promise<ResponseData<T>> => {
    const { host, protocol } = window?.location;
    const res = await fetch(`${protocol}//${host}/${pathname}?${search}`);
    return res.json();
  };

const initialOptions = {
  initialSize: 1, //最初应加载的页面数量
  revalidateAll: false, //始终尝试重新验证所有页面
  revalidateFirstPage: true, //始终尝试重新验证第一页
  persistSize: false, //当第一页的 key 发生变化时，不将 page size（或者 initialSize 如果设置了该参数）重置为 1
};

export const useInfinite = <T>(
  pathname: string,
  queryParams?: Record<string, any>,
  options: SWRInfiniteConfiguration = initialOptions,
) => {
  const {
    data = [],
    size,
    setSize,
    isValidating,
  } = useSWRInfinite(getKey<T>(queryParams), fetcher<T>(pathname), { ...initialOptions, ...options });
  const summaryData = data.reduce((acc, cur) => acc.concat(cur.data as T), [] as T[]);
  const isEnd = hasNotNextPage(size, data);

  return { summaryData, setSize, isEnd, isLoading: isValidating };
};
