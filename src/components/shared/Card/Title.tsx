import { twMerge } from 'tailwind-merge';

type CardTitleProps = {
  title: string;
  className?: string;
};

export default function Title({ title, className }: CardTitleProps) {
  return (
    <h1
      className={twMerge(
        'text-lg font-semibold leading-tight min-h-11 max-h-11 overflow-hidden overflow-ellipsis line-clamp-2',
        className
      )}
    >
      {title}
    </h1>
  );
}
