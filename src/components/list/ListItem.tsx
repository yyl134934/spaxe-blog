import { Post } from '@/entity/Common';
import Link from '@/components/Link';
import Tag from '../Tag';
export const Item = ({ post, isHome, path = 'blog' }: { post: Post; isHome?: boolean; path?: string }) => {
  return (
    <div className={(isHome ? 'py-12' : 'py-4') + ' flex flex-col sm:flex-row'}>
      <div className='w-64 min-w-sm'>
        <p className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400 min-w-full'>{post.date}</p>
      </div>

      <div className='space-y-5 xl:col-span-3 overflow-hidden'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold leading-8 tracking-tight my-0'>
            <Link className='!' href={`${path}/${post?.id}`}>
              {post?.title}
            </Link>
          </h2>

          <div className='flex flex-wrap m-0'>
            {post?.tags?.split(',').map((tag) => (
              <Tag key={`${post?.id} ${tag}`} tag={tag} />
            ))}
          </div>
        </div>
        <p title={post?.description} className='text-gray-500 dark:text-gray-400 mt-6 truncate'>
          {post?.description}
        </p>
        <div className='text-base font-medium leading-6'>
          {isHome ? <Link href={`blog/${post?.id}`}>阅读更多→</Link> : ''}
        </div>
      </div>
    </div>
  );
};

export default Item;
