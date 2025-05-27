
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';




type AuthContextType = {

  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: () => Boolean;
  token : string | null;
};
type Props = {children: React.ReactNode}


const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }:Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  
  
  useEffect(() => {
    const usertoken = Cookies.get('token');

    if (usertoken) {
      setToken(usertoken); ;
      
    }
    setIsReady(true);
  }, []);

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 7 });
    setToken(token);
  };

  const logout = () => {
    Cookies.remove('token');
    navigate("/")
  };

  const isLoggedIn = () => {
    if(Cookies.get("token")){
      return true;
    } 
    return false;
  }

  return (
    <AuthContext.Provider value={{ token, login , logout, isLoggedIn }}>
        {isReady ? children : null}
    </AuthContext.Provider>
  );

  
};

export const useAuth = () => React.useContext(AuthContext);


