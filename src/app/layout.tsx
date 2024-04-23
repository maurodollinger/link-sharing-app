import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';

import './globals.css';
import './globals.scss';

const instrument_sans = Instrument_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Link Sharing App',
  description: 'Created by Mauro Dollinger',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${instrument_sans.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
