import { Link } from 'react-router-dom';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';

export function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-around px-3">
      <Link to="/">
        <img
          width={64}
          height={64}
          src="/vite.svg"
          className="h-8 w-auto max-sm:h-6"
          alt="logo"
        />
      </Link>
      <NavBar />
      <div className="flex items-center justify-center gap-4">
        <MobileNavBar />
      </div>
    </header>
  );
}
