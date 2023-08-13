'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      This is the dashboard (Protected)
      <Button onClick={() => router.push('/')}>Get Back to Home Page</Button>
    </div>
  );
};

export default Dashboard;
