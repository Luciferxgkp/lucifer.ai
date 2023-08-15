'use client';

import { ArrowRight } from 'lucide-react/dist/esm/lucide-react';
import Link from 'next/link';
import { Button } from 'src/components/ui/button';

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center bg-[#111827]">
      <h1 className="text-5xl text-secondary">Lucifer.ai</h1>
      <p className="text-muted-foreground">An open source AI platform</p>
      <Button asChild>
        <Link href="/dashboard">
          Get Started
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </Button>
    </div>
  );
}
