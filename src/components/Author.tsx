import Image from 'next/image';

const Author = ({ author }: { author: { name?: string; github?: string }; className?: string }) => {
  const { name, github } = author;
  return (
    <div className='pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700 flex flex-row xl:justify-start justify-center'>
      <div className=' mx-2 border-circle-50 border-2 border-gray-200 dark:border-gray-200 rounded-full'>
        <Image priority src={'/author.png'} alt='author|头像' className='h-10 w-10' width={38} height={38} />
      </div>
      <div>
        <div className='text-gray-900 dark:text-gray-100 text-sm font-bold'>{name}</div>
        <div>
          <a
            target='_blank'
            className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm'
            href={github}
          >{`@${name}`}</a>
        </div>
      </div>
    </div>
  );
};
export default Author;
