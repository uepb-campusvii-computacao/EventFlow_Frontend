import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { navbar_links } from '@/lib/constants';

export function NavBar() {
  const links = navbar_links;

  return (
    <NavigationMenu className="max-md:hidden">
      <NavigationMenuList>
        {links.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              href={item.href}
              className={`${navigationMenuTriggerStyle()} !text-base`}
            >
              {item.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
