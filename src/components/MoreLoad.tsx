type MoreLoadProps = {
  handleNext: (e: any) => void;
  isEnd: boolean;
};

function MoreLoad({ handleNext, isEnd }: MoreLoadProps) {
  return (
    <div className='py-6 flex justify-center'>
      <button
        className='text-primary-500 hover:text-primary-600 disabled:cursor-not-allowed disabled:text-gray-400 hover:disabled:text-gray-400'
        onClick={handleNext}
        disabled={isEnd}
      >
        {isEnd ? '到底啦~' : '加载更多'}
      </button>
    </div>
  );
}
export default MoreLoad;
