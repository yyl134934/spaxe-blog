import { Post } from '@/entity/Common';
import Link from 'next/link';
import Tag from './Tag';

const List = ({ postsData }: { postsData: Post[] }) => {
  return (
    <div>
      {postsData.map((post) => (
        <div key={post?.id} className='flex flex-col sm:flex-row py-12 border-y'>
          <div className='w-64'>
            <p className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>{post.date}</p>
          </div>

          <div className='space-y-5 xl:col-span-3'>
            <div>
              <Link href={`posts/${post?.id}`}>
                <h2 className='text-2xl font-bold leading-8 tracking-tight'>{post?.title}</h2>
              </Link>
              <div className='flex flex-wrap m-0'>
                {post?.tags?.split(',').map((tag) => (
                  <Tag key={`${post?.id} ${tag}`} tag={tag} />
                ))}
              </div>
              <p className='prose max-w-none text-gray-500 dark:text-gray-400 mt-6'>{post?.description}</p>
            </div>
            <div className='text-base font-medium leading-6'>
              <Link
                className=' text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                href={`posts/${post?.id}`}
              >
                阅读更多→
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default List;
