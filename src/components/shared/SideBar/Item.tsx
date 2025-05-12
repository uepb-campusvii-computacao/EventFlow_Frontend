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
  title: string;
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
          'flex items-center gap-2 p-4 text-sm lg:text-lg font-semibold text-gray-800 hover:bg-gray-200 rounded-md transition-colors duration-200',
          className
        )}
      >
        {icon}
        <span className={titleClassName}>{title}</span>
      </Link>
    </li>
  );
}
