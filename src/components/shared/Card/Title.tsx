import { twMerge } from 'tailwind-merge';

type CardTitleProps = {
  title: string;
  className?: string;
};

export default function Title({ title, className }: CardTitleProps) {
  return (
    <h1
      className={twMerge(
        'text-lg font-semibold overflow-hidden overflow-ellipsis',
        className
      )}
    >
      {title}
    </h1>
  );
}
