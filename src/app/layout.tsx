import Nav from '@/components/Nav';
import ThemeSwitch from '@/components/ThemeSwitch';
import headerNavLinks from '@/data/headerNavLinks';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Providers } from './providers';
import Link from '@/components/Link';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: '二百一十三号选手',
  description: '二百一十三号选手的博客',
  keywords:
    'nextjs,tailwind,tailwindcss,react,typescript,javascript,blog,mdx,markdown,nextjs-starter-blog,nextjs-blog-with-mdx',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: ['/favicons/apple-touch-icon.png'],
  },
  openGraph: {
    title: '二百一十三号选手的博客',
    images: `https://og-image.vercel.app/${encodeURI(
      '二百一十三号选手的博客',
    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`,
  },
  twitter: {
    card: 'summary_large_image',
  },
  manifest: '/favicons/site.webmanifest',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='zh-Hans' suppressHydrationWarning>
      <body>
        <Providers>
          <div className='mx-auto my-0 px-6 max-w-5xl h-screen scroll'>
            <header>
              <div className='flex items-center justify-between py-10 dark:text-gray-100'>
                <Link href={'/'} className='!'>
                  <div className='flex items-center'>
                    <Image priority src='/logo.png' alt='logo' width={80} height={50} />
                    <div className='font-semibold hidden sm:block text-2xl text-center h-fit'>
                      {metadata.title as string}
                    </div>
                  </div>
                </Link>
                <div className='flex flex-row items-center font text-xl mr-8'>
                  <Nav linkData={headerNavLinks}></Nav>
                  <ThemeSwitch />
                </div>
              </div>
            </header>
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
