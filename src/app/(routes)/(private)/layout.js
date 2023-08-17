import Navbar from 'src/components/navbar';
import Sidebar from 'src/components/sidebar';
import { getApiLimit } from 'src/lib/api-limit';
const PrivateLayout = async ({ children }) => {
  const apiLimit = await getApiLimit();
  return (
    <div className="flex h-full w-full">
      <Sidebar className="hidden md:flex" apiLimit={apiLimit} />
      <div className="flex flex-col w-full">
        <Navbar apiLimit={apiLimit} />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PrivateLayout;
