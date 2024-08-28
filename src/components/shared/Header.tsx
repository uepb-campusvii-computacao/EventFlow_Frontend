import { Link } from 'react-router-dom';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';

export function Header() {
  return (
    <header className="flex h-16 px-8 w-full items-center justify-between border-b-[4px] border-b-accent">
      <Link to="/">
        <img
          width={64}
          height={64}
          src="/logo.png"
          className="h-12 w-auto max-sm:h-10"
          alt="logo"
        />
      </Link>
      <NavBar />
      <MobileNavBar /> {/* its hidden until the width got 768px */}
    </header>
  );
}
