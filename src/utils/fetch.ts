import { ResponseData } from '@/entity/Response';

export const origin = process.env.NODE_ENV !== 'production' ? 'http://localhost:6002' : 'https://spaxe-blog.vercel.app';

export const fetcher = async <T>(pathAndParams: string, options?: Record<string, any>): Promise<ResponseData<T>> => {
  const res = await fetch(`${origin}/${pathAndParams}`, options);
  return res.json();
};
