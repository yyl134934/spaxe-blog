import siteMeta from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Nav from './Nav';
import ThemeSwitch from './ThemeSwitch';

export default function Layout({ children }: any) {
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex items-center justify-between py-10'>
        <div>
          <span className='font-semibold text-4xl ml-8'>{siteMeta.headerTitle}</span>
        </div>
        <div className='flex flex-row items-center font text-xl mr-8'>
          <Nav linkData={headerNavLinks}></Nav>
          <ThemeSwitch />
        </div>
      </div>
      <div className='flex-1 '>Content{children}</div>
      <div>Footer</div>
    </div>
  );
}
