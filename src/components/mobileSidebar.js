import { Menu } from 'lucide-react/dist/esm/lucide-react';
import { Button } from 'src/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from 'src/components/ui/sheet';
import Sidebar from './sidebar';
const MobileSidebar = ({ apiLimit = 0 }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden" asChild>
          <Menu className="text-base" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <Sidebar className="md:hidden" apiLimit={apiLimit} />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
