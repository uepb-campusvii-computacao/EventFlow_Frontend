/* eslint-disable prettier/prettier */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export function SearchPayment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer text-base font-light transition-opacity hover:opacity-70">
          {' '}
          Já se inscreveu? busque aqui sua inscrição
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Busque seu comprovante de inscrição
          </DialogTitle>
          <DialogDescription>
            Informe o e-mail cadastrado e verifique seus dados
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <Input className="text-base" type="email" placeholder="E-mail" />
        </div>
        <DialogFooter>
          <button className="button-secondary text-base" type="submit">
            Buscar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
