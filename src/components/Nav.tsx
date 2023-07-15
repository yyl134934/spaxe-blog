import { HeaderLinkProps } from '@/entity/Common';
import Link from 'next/link';

export default function Nav({ linkData = [] }: { linkData: HeaderLinkProps[] }) {
  console.log('🚀🐍 ~ file: Nav.tsx:5 ~ Nav ~ linkData:', linkData);
  return (
    <div className='flex-row hidden sm:flex dark:text-white'>
      {linkData.map(({ href, title }, index) => {
        return (
          <Link
            className='p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4'
            key={href + title + index}
            href={href}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}
