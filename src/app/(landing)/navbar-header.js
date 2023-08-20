'use client';
import { useAuth } from '@clerk/nextjs';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { Button } from 'src/components/ui/button';
import { cn } from 'src/lib/utils';
const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });
const NavbarHeader = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="p-4 flex items-center justify-between bg-transparent">
      <Link href={'/'}>
        <h1
          className={cn('text-2xl text-white font-bold', montserrat.className)}
        >
          Lucifer
        </h1>
      </Link>
      <Button className="rounded-full" variant="outline" asChild>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>Get Started</Link>
      </Button>
    </div>
  );
};

export default NavbarHeader;
