const LoadingItem = () => {
  return (
    <div className={'py-12 flex flex-col sm:flex-col w-full'}>
      {new Array(6).fill(0).map((item, index) => (
        <p key={index} className='prose max-w-none bg-gray-500 w-full h-6 mt-6 rounded-md'></p>
      ))}
    </div>
  );
};

function MarkDownLoading() {
  return (
    <div className='animate-pulse divide-y divide-gray-200 dark:divide-gray-700 border-t border-gray-200 dark:border-gray-700 flex flex-col w-full'>
      <LoadingItem />
    </div>
  );
}
export default MarkDownLoading;
