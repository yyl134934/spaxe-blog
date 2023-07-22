import { Post } from '@/entity/Common';
import { ResponseData } from '@/entity/Response';
import { useInfinite } from '@/hooks/useInfinite';
import { debounce } from '@/utils/debounce';
import { useState } from 'react';

interface Search {
  keyword: string;
  onSearch: (e: any) => void;
}

export const useSearch = (initial: string = ''): Search => {
  const [keyword, setKeyword] = useState(initial);
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

export const usePostsQuery = (queryParams?: Record<string, any>) => {
  const pathname = 'api/getPostData';
  return useInfinite<Post>(pathname, queryParams);
};
