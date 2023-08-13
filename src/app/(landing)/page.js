'use client';

import { Button } from 'src/components/ui/button';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl">Lucifer.ai</h1>
      <p className="text-foreground">
        An open source AI platform (Unprotected)
      </p>
      <Button asChild>
        <Link href="/dashboard">Get Started</Link>
      </Button>
    </div>
  );
}
