import { debounce } from '@/utils/debounce';
import { useState } from 'react';

type Search = {
  keyword: string;
  onSearch: (e: any) => void;
};

export const useSearch = (): Search => {
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
