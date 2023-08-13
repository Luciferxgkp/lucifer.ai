'use client';

// import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl">Lucifer.ai</h1>
      <p className="text-foreground">
        An open source AI platform (Unprotected)
      </p>
      <button
        onClick={() => {
          router.push('/sign-in');
        }}
      >
        Get Started
      </button>
      <UserButton afterSignOutUrl="/" className="text-foreground h-10 w-10" />
    </div>
  );
}
