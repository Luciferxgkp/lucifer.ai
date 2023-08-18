'use client';
import { Zap } from 'lucide-react/dist/esm/lucide-react';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/ui/button';
import { Card, CardContent } from 'src/components/ui/card';
import { Progress } from 'src/components/ui/progress';
import { MAX_FREE_COUNT, pages } from 'src/constants';
import { useProModal } from 'src/hooks/use-pro-modal';
import { cn } from 'src/lib/utils';
const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const Sidebar = ({ className, apiLimit = 0, isPro = false }) => {
  const proModal = useProModal();
  const pathName = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return;
  return (
    <div
      className={cn(
        'flex flex-col w-72 h-full  bg-[#111827]  items-center justify-between py-5',
        className
      )}
    >
      <div className="w-full flex flex-col items-center space-y-6 text-white ">
        <div className={cn('flex text-2xl font-bold', montserrat?.className)}>
          Lucifer
        </div>
        <div className="w-full flex flex-col space-y-2">
          {pages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className={cn(
                'text-sm flex items-center space-x-2 px-4 mx-4 py-2 rounded-md hover:bg-white/10 hover:text-white transition duration-200',
                pathName === page.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/60'
              )}
            >
              {page?.icon && <page.icon className={page.color} />}
              <div>{page?.label}</div>
            </Link>
          ))}
        </div>
      </div>
      {!isPro && (
        <div className="px-3">
          <Card className="bg-white/10 border-0">
            <CardContent className="py-6 mb-4 space-y-2">
              <div className="text-sm text-white ">
                {apiLimit} / {MAX_FREE_COUNT} Free Generations
              </div>
              <Progress
                value={(apiLimit / MAX_FREE_COUNT) * 100}
                className="h-4 w-full"
              />
              <Button
                className="w-full"
                variant="premium"
                onClick={proModal.onOpen}
              >
                Upgrade
                <Zap className="ml-2 w-4 h-4 fill-white" />
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
