import { fetchUserData, useAuth } from '@/hooks/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Container } from './Container';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';
import { LogOutIcon } from 'lucide-react';

export function Header() {
  const queryClient = useQueryClient();
  const [, , removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const { data, isLoading} = useQuery({ 
    queryKey: ['user-data'],
    queryFn: fetchUserData,
  });

  async function handleToggleLogOut() {
    removeCookie('token');
    await queryClient.invalidateQueries();
    window.localStorage.clear();
    navigate('/');
    window.location.reload()
  }

  return (
    <header className="w-full border-b-[1px] border-b-purple-500">
      <Container className="flex items-center justify-between h-16">
        <Link to="/">
          <img
            width={64}
            height={64}
            src="/logo.png"
            className="hidden md:flex md:h-12 md:w-auto max-sm:h-10"
            alt="logo"
          />
           <img
            width={90}
            height={90}
            src="/logo-v2.png"
            className="flex md:hidden"
            alt="logo"
          />

        </Link>
        <NavBar />
        <MobileNavBar/>
        {data ? (
          <Popover>
            <PopoverTrigger className="font-mono border-4 rounded-full w-16 md:w-32 lg:w-40 h-12 flex items-center justify-center text-center">
              {isLoading ? '...' : data.initials}
            </PopoverTrigger>
            <PopoverContent className='w-full p-0 px-8'>
              <button className='flex  items-center flex-cols-2 justify-center gap-2 w-20 h-12' onClick={handleToggleLogOut}>
                <span>Sair</span>
                <LogOutIcon className='text-red-600'/> 
              </button>
            </PopoverContent>
          </Popover>
        ) : (

            <Link to="/sign-in" className= "button-primary w-16 md:w-32 lg:w-40 text-[14px] md:text-[16px] lg:text-[18px]">
              Entrar
            </Link>
      
        )}
      </Container>
    </header>
  );
}
