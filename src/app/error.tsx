'use client';
import Link from '@/components/Link';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

function useError() {
  const [countdown, setCountdown] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (countdown <= 1) {
      router.replace('/');
      return;
    }
    const timer: NodeJS.Timeout = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return { countdown };
}

function Countdown() {
  const { countdown } = useError();
  return <>{countdown}</>;
}

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex flex-col items-start justify-start md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6'>
      <div className='space-x-2 pt-6 pb-8 md:space-y-5'>
        <h2 className='text-6xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:border-r-2 md:px-6 md:text-8xl md:leading-14'>
          500
        </h2>
      </div>
      <div className='max-w-md'>
        <p className='mb-4 text-xl font-bold leading-normal md:text-2xl'>抱歉！服务器发生不可预期错误。</p>
        <p className='mt-4'>
          <Countdown />
          秒后将自动返回<Link href={'/'}>首页</Link>！
        </p>
      </div>
    </div>
  );
}
