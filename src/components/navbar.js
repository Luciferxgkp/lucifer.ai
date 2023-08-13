import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobileSidebar';
const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 my-4 w-full">
      <MobileSidebar /> <UserButton afterSignOutUrl="/" className="text-base" />
    </div>
  );
};
export default Navbar;
