const LoadingItem = () => {
  return (
    <div className={'py-12 flex flex-col sm:flex-row w-full'}>
      <div className='w-64 mb-2'>
        <p className=' bg-gray-500 w-24 h-6 rounded-sm'></p>
      </div>

      <div className='space-y-5 xl:col-span-3 grow'>
        <div className='space-y-2'>
          <h2 className='my-0 bg-gray-500 w-32 h-10 rounded-md'></h2>

          <div className='flex flex-wrap m-0 space-x-3'>
            {new Array(4).fill(0).map((tag, index) => (
              <div key={index} className='bg-gray-500 w-8 h-6 rounded-md'></div>
            ))}
          </div>
        </div>
        <p className='prose max-w-none bg-gray-500 w-38 h-6 mt-6 rounded-md'></p>
        <p className='prose max-w-none bg-gray-500 w-38 h-6 mt-6 rounded-md'></p>
        <div>
          <div className='bg-gray-500 w-16 h-6 rounded-md'></div>
        </div>
      </div>
    </div>
  );
};

function Loading() {
  return (
    <div className='animate-pulse divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700 flex flex-col w-full'>
      {new Array(2).fill(0).map((item, index) => (
        <LoadingItem key={index} />
      ))}
    </div>
  );
}
export default Loading;
