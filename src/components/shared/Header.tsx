import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Container } from './Container';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';

export function Header() {
  const { data, isFetching } = useAuth();
  const queryClient = useQueryClient();
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  function handleToggleLogOut() {
    removeCookie('token');
    queryClient.invalidateQueries();
    window.localStorage.clear();
    navigate('/');
    window.location.reload()
  }

  return (
    <header className="w-full border-b-[4px] border-b-accent">
      <Container className="flex items-center justify-between h-16">
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
        <MobileNavBar />
        {data ? (
          <Popover>
            <PopoverTrigger className="font-mono border rounded-full w-12 h-12 flex items-center justify-center text-center">
              {isFetching ? '...' : data.initials}
            </PopoverTrigger>
            <PopoverContent>
              <button onClick={handleToggleLogOut}>Log out</button>
            </PopoverContent>
          </Popover>
        ) : (
          <a href="/sign-in">Login</a>
        )}
      </Container>
    </header>
  );
}
