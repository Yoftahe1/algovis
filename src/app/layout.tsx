import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.scss';
import React from 'react';
// import HeaderComponent from './components/layouts/header/HeaderComponent';
// import FooterComponent from './components/layouts/footer/FooterComponent';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '100', '300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: "Algovis",
  description: 'A curated collection of algorithm',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body suppressHydrationWarning={true} className={poppins.className}>
        {/* <HeaderComponent /> */}
        <main>{children}</main>
        {/* <FooterComponent /> */}
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
}
