import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { cn } from 'src/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lucifer.ai',
  description: 'An open source AI for the masses',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn('h-full', inter.className)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
