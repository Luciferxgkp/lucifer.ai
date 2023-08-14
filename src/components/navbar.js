import { UserButton } from '@clerk/nextjs';
import MobileSidebar from './mobileSidebar';
const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 w-full ">
      <MobileSidebar /> <UserButton afterSignOutUrl="/" />
    </div>
  );
};
export default Navbar;
