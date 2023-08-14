'use client';

import Link from 'next/link';
import { Button } from 'src/components/ui/button';

const Conversation = () => {
  return (
    <div className="w-full h-screen">
      This is the Conversation (Protected)
      <Button asChild className="bg-primary">
        <Link href="/">Get Back to Home Page</Link>
      </Button>
    </div>
  );
};

export default Conversation;
