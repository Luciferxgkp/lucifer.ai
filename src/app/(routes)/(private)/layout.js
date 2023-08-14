import Navbar from 'src/components/navbar';
import Sidebar from 'src/components/sidebar';
const PrivateLayout = ({ children }) => {
  return (
    <div className="flex h-full w-full">
      <Sidebar className="hidden md:flex" />
      <div className="flex flex-col w-full">
        <Navbar />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PrivateLayout;
