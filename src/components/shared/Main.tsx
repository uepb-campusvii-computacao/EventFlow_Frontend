import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Main({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <main className={twMerge('flex h-full flex-col', className)}>
      {children}
    </main>
  );
}
