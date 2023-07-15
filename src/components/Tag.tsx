import Link from 'next/link';

const Tag = ({ key, tag }: { key: string; tag: string }) => {
  return (
    <div
      key={key}
      className='mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
    >
      <Link href={`/tags/${tag}`}>{tag}</Link>
    </div>
  );
};
export default Tag;
