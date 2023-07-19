'use client';
import { HeaderLinkProps } from '@/entity/Common';
import Link from '@/components/Link';
import { useCallback, useEffect, useState } from 'react';

const useTouchMoveEvent = (fn: (event: any) => void, ready?: boolean) => {
  useEffect(() => {
    const navMask = document.getElementById('nav-mask') as HTMLElement;
    navMask.addEventListener('touchmove', fn, { passive: false });

    return () => navMask?.removeEventListener('touchmove', fn);
  }, [ready, fn]);
};

const useWindowResize = (fn: (event: any) => void, ready?: boolean) => {
  useEffect(() => {
    window.addEventListener('resize', fn);

    return () => window.removeEventListener("'resize'", fn);
  }, [fn]);
};

export default function Nav({ linkData = [] }: { linkData: HeaderLinkProps[] }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleClose = () => {
    !showMobileMenu || setShowMobileMenu(false);
  };

  function forbidScroll(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  const autoCloseMenu = useCallback(() => {
    const mdWidth = 768; //@media md-768px
    if (window?.innerWidth > mdWidth && showMobileMenu) {
      setShowMobileMenu(false);
    }
  }, [showMobileMenu]);

  useWindowResize(autoCloseMenu);

  useTouchMoveEvent(forbidScroll);

  const menuClass = showMobileMenu
    ? 'flex flex-col h-screen fixed top-4 right-4 z-50 bg-gray-50 dark:bg-gray-900 md:h-auto md:w-auto md:bg-transparent' +
      ' md:dark:bg-transparent md:flex md:flex-row md:justify-center md:items-center md:p-0' +
      ' max-w-xs bg-white rounded-lg shadow-lg p-6 text-base text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:highlight-white/5' +
      ' w-60 max-h-80 space-y-6'
    : 'flex-row hidden md:flex dark:text-white static top-0 right-0 bg-transparent';
  const maskClass = showMobileMenu
    ? 'filter fixed top-0 left-0 w-full h-full z-40 inset-0 bg-black/20 backdrop-blur-sm dark:bg-slate-900/80'
    : '';
  const closeClass = showMobileMenu ? 'absolute top-4 right-6 z-50 sm:block' : 'hidden';

  return (
    <div className='md:-order-last -order-first ml-1 mr-1 py-1 sm:static relative z-50 transition-opacity'>
      <div id='nav-mask' onClick={handleToggle} className={maskClass}></div>
      <div className={`${menuClass}`}>
        <button onClick={handleClose} className={closeClass}>
          X
        </button>
        {linkData.map(({ href, title }, index) => {
          return (
            <Link
              onClick={handleClose}
              className='p-1 font-semibold sm:font-medium text-gray-900 dark:text-gray-100 md:p-4 whitespace-nowrap'
              key={href + title + index}
              href={href}
            >
              {title}
            </Link>
          );
        })}
      </div>
      <button onClick={handleToggle} className='block md:hidden h-8 w-8 rounded'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          className='text-gray-900 dark:text-gray-100'
        >
          <path
            // fill-rule='evenodd'
            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            // clip-rule='evenodd'
          ></path>
        </svg>
      </button>
    </div>
  );
}
