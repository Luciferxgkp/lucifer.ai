'use client';
import axios from 'axios';
import { Check, Zap } from 'lucide-react/dist/esm/lucide-react';
import React from 'react';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Card } from 'src/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';
import { pages } from 'src/constants';
import { useProModal } from 'src/hooks/use-pro-modal';
import { cn } from 'src/lib/utils';

const ProModalPage = () => {
  const proModal = useProModal();
  const [isMounted, setIsMounted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
      // console.log(response);
    } catch (error) {
      console.log('STRIPE ERROR', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-col items-center gap-y-4 pb-2 justify-center">
              <div
                className="flex items-center font-bold py-1
                gap-x-2
              "
              >
                Upgrade to Lucifer
                <Badge variant="premium" className="text-sm uppercase">
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center gap-y-4 pt-2 justify-center">
              {pages
                .filter(
                  (page) =>
                    page.label !== 'Dashboard' && page.label !== 'Settings'
                )
                .map((page, index) => (
                  <Card
                    key={index}
                    className="p-3 border-black/3 flex items-center justify-between w-full"
                  >
                    <div className="flex flex-row items-center gap-x-4">
                      <div className={'p-2 w-fit'}>
                        <page.icon className={cn('w-6 h-6', page.color)} />
                      </div>
                      <h1 className="text-sm font-semibold">{page.label}</h1>
                      {/* <ArrowRight className="w-8 h-8" /> */}
                    </div>
                    <Check className="w-6 h-6" />
                  </Card>
                ))}
              <Button
                onClick={onSubscribe}
                className="ml-auto w-full"
                variant="premium"
                disabled={loading}
              >
                Upgrade
                <Zap className="w-4 h-4 ml-2" />
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProModalPage;
