import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl">Lucifer.ai</h1>

      <p className="text-foreground">An open source AI platform</p>
      <Button>Get Started</Button>
    </div>
  );
}
