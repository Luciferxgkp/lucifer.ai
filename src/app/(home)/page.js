'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl">Lucifer.ai</h1>
      <p className="text-foreground">
        An open source AI platform (Unprotected)
      </p>
      <Button
        onClick={() => {
          router.push('/dashboard');
        }}
      >
        Get Started
      </Button>
    </div>
  );
}
