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
        'flex w-fit h-full bg-neutral-50 shadow-md shadow-gray-400',
        className
      )}
    >
      <ul className="list-none w-full p-4 space-y-4">{children}</ul>
    </nav>
  );
}
