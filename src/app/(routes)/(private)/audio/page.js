'use client';

import Link from 'next/link';
import { Button } from 'src/components/ui/button';

const Audio = () => {
  return (
    <div className="w-full h-screen">
      This is the Audio (Protected)
      <Button asChild className="bg-primary">
        <Link href="/">Get Back to Home Page</Link>
      </Button>
    </div>
  );
};

export default Audio;
