import React from 'react';
import { twMerge } from 'tailwind-merge';

export default function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={twMerge('p-3', className)}>{children}</div>;
}
