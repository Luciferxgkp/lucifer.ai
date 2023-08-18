'use client';
import axios from 'axios';
import { Zap } from 'lucide-react/dist/esm/lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from 'src/components/ui/button';
const ManageSubscription = ({ isPro = false }) => {
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
      // console.log(response);
    } catch (error) {
      // console.log('STRIPE ERROR', error);
      toast.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <Button
        onClick={onClick}
        disabled={loading}
        variant={isPro ? 'default' : 'premium'}
      >
        {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
        {!isPro && <Zap className="ml-2" />}
      </Button>
    </div>
  );
};

export default ManageSubscription;
