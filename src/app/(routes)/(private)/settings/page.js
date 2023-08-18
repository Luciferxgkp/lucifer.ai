import { Settings } from 'lucide-react/dist/esm/lucide-react';
import Heading from 'src/components/heading';

const Setting = () => {
  return (
    <div className="w-full h-screen">
      <Heading
        title="Setting"
        description="Manage your account settings."
        Icon={Settings}
        iconColor="text-lime-500"
      />
    </div>
  );
};

export default Setting;
