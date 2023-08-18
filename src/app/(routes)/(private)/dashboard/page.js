'use client';

import { ArrowRight } from 'lucide-react/dist/esm/lucide-react';
import Link from 'next/link';
import { pages } from 'src/constants';
import { cn } from 'src/lib/utils';

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center gap-8 ">
      <div className="w-full flex flex-col items-center justify-center gap-2 md:gap-4 ">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
          Explore the power of AI
        </h1>
        <h2 className="text-muted-foreground text-sm md:text-base lg:text-lg">
          Chat with the smartest AI assistant
        </h2>
      </div>
      <div className="w-full h-full flex flex-col items-center gap-2 md:gap-4 px-8 md:px-16 lg:px-32">
        {pages
          .filter((page) => page.label !== 'Dashboard')
          .map((page, index) => (
            <Link
              href={page.href}
              key={index}
              className="h-20 w-full border rounded-lg p-4"
            >
              <div className="flex flex-row items-center justify-between">
                <div className={'flex flex-row items-center gap-4'}>
                  <page.icon className={cn('w-10 h-10', page.color)} />
                  <h1 className="text-base md:text-lg lg:text-xl font-bold">
                    {page.label}
                  </h1>
                </div>
                <ArrowRight className="w-8 h-8" />
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
