import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobileSidebar';
const Navbar = ({ apiLimit = 0, isPro = false }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 w-full ">
      <MobileSidebar apiLimit={apiLimit} isPro={isPro} />{' '}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
export default Navbar;
