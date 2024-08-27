import { Link } from 'react-router-dom';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';
import { Container } from './Container';

export function Header() {
  return (
    <header className="w-full border-b-[4px] border-b-accent">
      <Container className="flex items-center justify-between h-16"> 
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
        <MobileNavBar /> {/* its hidden until the width got 768px */}
      </Container>
      
    </header>
  );
}
