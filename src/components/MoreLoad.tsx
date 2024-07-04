type MoreLoadProps = {
  handleNext: (e: any) => void;
  isEnd: boolean;
  isLoading: boolean;
};

function MoreLoad({ handleNext, isEnd, isLoading }: MoreLoadProps) {
  function getDescText(isend: boolean, isloading: boolean) {
    if (isloading) {
      return '内容正在加载中...';
    }
    if (isend) {
      return '没有更多内容啦~';
    }
    return '点击加载更多';
  }

  return (
    <div className='py-6 flex justify-center'>
      <button
        className='text-primary-500 hover:text-primary-600 disabled:cursor-not-allowed disabled:text-gray-400 hover:disabled:text-gray-400'
        onClick={handleNext}
        disabled={isEnd}
      >
        {getDescText(isEnd, isLoading)}
      </button>
    </div>
  );
}
export default MoreLoad;
