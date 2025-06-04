import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export function Item({
  to,
  title,
  icon,
  className,
  titleClassName,
}: {
  icon?: React.ReactNode;
  to: string;
  title?: string;
  className?: string;
  titleClassName?: string;
}) {
  const { pathname } = useLocation();

  return (
    <li className="w-full h-fit">
      <Link
        data-active={pathname === to}
        to={to}
        className={twMerge(
          'flex items-center gap-2 p-4 text-sm lg:text-lg font-semibold border-2 border-gray-400 text-gray-500 rounded-2xl transition-colors duration-200 hover:bg-gray-900 hover:text-gray-200 data-[active=true]:text-gray-200 data-[active=true]:bg-gray-900 data-[active=true]:border-gray-200 hover:border-gray-200 ',
          className
        )}
        about={title}
      >
        {icon}
        {title && (
          <span className={twMerge('text-gray-600', titleClassName)}>
            {title}
          </span>
        )}
      </Link>
    </li>
  );
}
