import { twMerge } from 'tailwind-merge';

type CardDescriptionProps = {
  description: string;
  className?: string;
};

export default function Description({
  description,
  className,
}: CardDescriptionProps) {
  return (
    <p className={twMerge('font-medium text-base', className)}>{description}</p>
  );
}
