import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  ReduxProvider,
  ReactHotToast,
  ReactQueryClientProvider,
} from '@/providers';
import { AccountCreateSheet } from '@/components/account-create-sheet';
import { AccountEditSheet } from '@/components/account-edit-sheet';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance',
  description: 'Finance is a personal finance management tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ReactQueryClientProvider>
            <AccountCreateSheet />
            <AccountEditSheet />
            <ReactHotToast />
            {children}
            {process.env.NODE_ENV === 'development' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </ReactQueryClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
