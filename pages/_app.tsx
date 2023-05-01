import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import React from 'react';

interface Props extends AppProps {
  Component: AppProps['Component'] & {
    getLayout: (page: React.ReactElement) => React.ReactNode;
  };
}

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}
