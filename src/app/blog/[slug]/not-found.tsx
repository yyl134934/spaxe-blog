import Image from 'next/image';

function NotFound() {
  return (
    <div className='flex justify-center items-center flex-col'>
      <Image priority quality={80} src={'/404.svg'} alt='404|not found' height={600} width={600} />
      <p className=''>OOPS！页面暂未施工😛</p>
    </div>
  );
}
export default NotFound;
