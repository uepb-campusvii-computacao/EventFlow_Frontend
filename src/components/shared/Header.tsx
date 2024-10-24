import { useAuth } from '@/hooks/useAuth';
import { Container } from './Container';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';

export function Header() {
  const { userQuery } = useAuth();

  return (
    <header className="w-full border-b-[4px] border-b-accent">
      <Container className="flex items-center justify-between h-16">
        <a href="/">
          <img
            width={64}
            height={64}
            src="/logo.png"
            className="h-12 w-auto max-sm:h-10"
            alt="logo"
          />
        </a>
        <NavBar />
        <MobileNavBar /> {/* its hidden until the width got 768px */}
        {userQuery.data?.initials ? (
          <div className="font-mono border rounded-full w-12 h-12 flex items-center justify-center text-center">
            {userQuery.data?.initials}
          </div>
        ) : (
          <a href="/sign-in">Login</a>
        )}
      </Container>
    </header>
  );
}
