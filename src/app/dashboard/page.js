'use client';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from 'src/components/ui/button';

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      This is the dashboard (Protected)
      <Button asChild className="bg-primary">
        <Link href="/">Get Back to Home Page</Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Dashboard;
