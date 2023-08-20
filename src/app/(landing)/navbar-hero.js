'use client';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from 'src/components/ui/button';
import TypewriterComponent from 'typewriter-effect';
const NavbarHero = () => {
  const { isSignedIn } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
        space-y-5 font-extrabold"
      >
        <h1> The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#EC4899]">
          <TypewriterComponent
            options={{
              strings: [
                'ChatBot.',
                'Photo Generation.',
                'Video Generation.',
                'Code Generation.',
                'Audio Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-muted-foreground">
        Create Content using AI 10x Faster.
      </div>
      <Button
        variant="premium"
        asChild
        className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
      >
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          Get Generating For Free
        </Link>
      </Button>
      <div className="text-xs md:text-sm font-normal text-muted-foreground">
        No Credit Card Required.
      </div>
    </div>
  );
};

export default NavbarHero;
