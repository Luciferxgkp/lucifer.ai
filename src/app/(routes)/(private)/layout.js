import Navbar from 'src/components/navbar';
import Sidebar from 'src/components/sidebar';
import { getApiLimit } from 'src/lib/api-limit';
import { checkSubscription } from 'src/lib/subscriptions';
const PrivateLayout = async ({ children }) => {
  const apiLimit = await getApiLimit();
  const isPro = await checkSubscription();
  return (
    <div className="flex h-full w-full">
      <Sidebar className="hidden md:flex" apiLimit={apiLimit} isPro={isPro} />
      <div className="flex flex-col w-full">
        <Navbar apiLimit={apiLimit} isPro={isPro} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PrivateLayout;
