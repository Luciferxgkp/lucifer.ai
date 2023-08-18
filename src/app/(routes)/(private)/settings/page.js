import { Settings } from 'lucide-react/dist/esm/lucide-react';
import React from 'react';
import Heading from 'src/components/heading';
import ManageSubscription from 'src/components/manage-subscription';
import { checkSubscription } from 'src/lib/subscriptions';

const Setting = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full h-screen">
      <Heading
        title="Setting"
        description="Manage your account settings."
        Icon={Settings}
        iconColor="text-lime-500"
      />
      <div className="flex flex-col p-4">
        <div className="text-xl font-bold">Account</div>
        <div className="text-base text-muted-foreground">
          {isPro ? 'You are a currently in Pro Plan' : 'You are in Free Plan'}
        </div>
        <ManageSubscription isPro={isPro} />
      </div>
    </div>
  );
};

export default Setting;
