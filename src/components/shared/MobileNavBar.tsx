import { navbar_links } from '@/lib/constants';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet, SheetContent, SheetTrigger
} from '../ui/sheet';

export function MobileNavBar() {
  const links = navbar_links;

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <div className="flex w-full flex-col items-center justify-center p-4">
            {links.map((item, index) => (
              <Link
                className="mt-2 w-full border-t pt-2 text-center font-medium"
                key={index}
                to={item.href}
              >
                {item.title}
              </Link>
            ))}
          </div>
          
        </SheetContent>
      </Sheet>
    </div>
  );
}
