const LoadingItem = () => {
  return (
    <div className={'py-12 flex flex-col sm:flex-col w-full items-end'}>
      {new Array(3).fill(1).map((item, index, array) => (
        <p
          key={`${item}-${index}`}
          className={`prose max-w-none bg-gray-500 w-full h-6 mt-6 rounded-md ${index === 0 ? 'max-w-[90%]' : ''} ${
            index >= array.length - 1 ? ' self-start max-w-[100%]' : ''
          }`}
        ></p>
      ))}
      {new Array(4).fill(2).map((item, index, array) => (
        <p
          key={`${item}-${index}`}
          className={`prose max-w-none bg-gray-500 w-full h-6 mt-6 rounded-md let ${
            index === 0 ? 'max-w-[90%]' : ''
          }  ${index >= array.length - 1 ? ' self-start max-w-[100%]' : ''}`}
        ></p>
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
