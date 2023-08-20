import ProModal from 'src/components/pro-modal';
import { checkSubscription } from 'src/lib/subscriptions';

const ModalProvider = async () => {
  const isSubscribed = await checkSubscription();
  if (isSubscribed) {
    return null;
  }
  return (
    <>
      <ProModal />
    </>
  );
};

export default ModalProvider;
