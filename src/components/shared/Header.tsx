import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Container } from './Container';
import { MobileNavBar } from './MobileNavBar';
import { NavBar } from './NavBar';

interface UserData{
  data : any,
  initials: string
}

export function Header() {
  const { userQuery } = useAuth();
  const queryClient = useQueryClient();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [,,removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userQuery.data) {
      setUserData(userQuery.data);
    } else {
      setUserData(null);
    }
  }, [userQuery.data]);

  async function handleToggleLogOut() {
    removeCookie('token', { path: '/' });
    queryClient.invalidateQueries({ queryKey: ['user-data'], exact: false });
    setUserData(null);
    navigate("/");
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
        {userData?.initials ? (
          <Popover>
            <PopoverTrigger className="font-mono border rounded-full w-12 h-12 flex items-center justify-center text-center">
              {userData.initials}
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