import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalProvider from 'src/components/modal-provider';
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
        <body className={cn('h-full', inter.className)}>
          <ModalProvider />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={true}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
