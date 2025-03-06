import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Container } from './Container';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';
import { LogOutIcon } from 'lucide-react';

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
        <MobileNavBar/>
        {data ? (
          <Popover>
            <PopoverTrigger className="font-mono border-4 rounded-full w-40 h-12 flex items-center  justify-center text-center">
              {isFetching ? '...' : data.initials}
            </PopoverTrigger>
            <PopoverContent>
              <button className='justify-itens-center flex-cols-2  w-40 h-12' onClick={handleToggleLogOut}>
                <LogOutIcon color="var(--primary)"/> 
                Sair
              </button>
            </PopoverContent>
          </Popover>
        ) : (

            <Link to="/sign-in" className= "button-primary">
              Entrar
              </Link>
      
        )}
      </Container>
    </header>
  );
}
