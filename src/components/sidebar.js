'use client';
import {
  Code,
  Image,
  LayoutDashboard,
  MessageSquare,
  Music,
  Video,
} from 'lucide-react/dist/esm/lucide-react';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from 'src/lib/utils';
const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const Sidebar = ({ className }) => {
  const pathName = usePathname();
  const pages = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: 'text-sky-500',
    },
    {
      label: 'Conversation',
      icon: MessageSquare,
      href: '/conversation',
      color: 'text-grey-500',
    },
    {
      label: 'Image Conversion',
      icon: Image,
      href: '/image',
      color: 'text-purple-500',
    },
    {
      label: 'Video',
      icon: Video,
      href: '/video',
      color: 'text-yellow-500',
    },
    {
      label: 'Audio',
      icon: Music,
      href: '/audio',
      color: 'text-slate-500',
    },
    {
      label: 'Code',
      icon: Code,
      href: '/code',
      color: 'text-violet-500',
    },
  ];
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;

  return (
    <div
      className={cn(
        'flex flex-col w-72 h-screen items-center bg-[#111827]  text-white space-y-6 py-5',
        className
      )}
    >
      <div className={cn('flex text-2xl font-bold', montserrat?.className)}>
        Lucifer
      </div>
      <div className="w-full flex flex-col space-y-2">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={cn(
              'text-sm flex items-center space-x-2 px-4 mx-4 py-2 rounded-md hover:bg-white/10 hover:text-white transition duration-200',
              pathName === page.href
                ? 'bg-white/10 text-white'
                : 'text-white/60'
            )}
          >
            {page?.icon && <page.icon className={page.color} />}
            <div>{page?.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
