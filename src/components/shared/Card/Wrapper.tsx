import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

type CardWrapperProps = {
  className?: string;
  children?: React.ReactNode;
};

export function Wrapper({ children, className }: CardWrapperProps) {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  if (!token) {
    navigate('/sign-in');
  }

  return (
    <div
      className={twMerge(
        'flex h-fit w-[512px] flex-col overflow-hidden rounded-md border shadow-md hover:scale-105 transition-transform duration-200 ease-in-out',
        className
      )}
    >
      {children}
    </div>
  );
}
