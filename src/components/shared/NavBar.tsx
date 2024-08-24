import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navbar_links } from '@/lib/constants';
import { Link } from 'react-router-dom';

export function NavBar() {
  const links = navbar_links;

  return (
    <NavigationMenu className="max-md:hidden">
      <NavigationMenuList>
        {links.map((item, index) => (
          <NavigationMenuItem key={index}>
            <Link to={item.href}>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} !text-base`}
              >
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
