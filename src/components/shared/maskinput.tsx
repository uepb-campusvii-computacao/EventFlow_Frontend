import { Ref, useState } from "react";
import { useIMask } from "react-imask";
import { Input } from '@/components/ui/input';

type MaskedInputProps = {
  mask: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function MaskedInput({ mask, ...props }: MaskedInputProps) {
  const [opts] = useState({ mask });
  const { ref } = useIMask(opts, {});

  return <Input ref={ref as Ref<HTMLInputElement>} {...props} />;
}