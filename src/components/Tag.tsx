import Link from '@/components/Link';

const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className='mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
      <Link href={`/tags/${tag}`}>{tag}</Link>
    </div>
  );
};
export default Tag;
