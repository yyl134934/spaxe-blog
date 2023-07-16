import Image from 'next/image';

function NotFound() {
  return (
    <div className='flex justify-center items-center'>
      <Image priority src={'/404.svg'} alt='404|not found' height={600} width={600} />
    </div>
  );
}
export default NotFound;
