import { twMerge } from 'tailwind-merge';

export function Wrapper({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <nav
      className={twMerge(
        'flex w-fit h-full min-w-40 bg-neutral-50 rounded-r-sm shadow-md shadow-gray-400',
        className
      )}
    >
      <ul className="list-none w-full">{children}</ul>
    </nav>
  );
}
