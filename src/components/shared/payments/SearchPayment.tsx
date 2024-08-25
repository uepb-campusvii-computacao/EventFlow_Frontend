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
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const findUserFormSchema = z.object({
  email: z.string().email(),
});

type FindUserFormSchema = z.infer<typeof findUserFormSchema>;

export function SearchPayment() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FindUserFormSchema>({
    resolver: zodResolver(findUserFormSchema),
  });

  const { slug } = useParams<{ slug: string }>();

  const { findEvent } = useEvents(slug);

  const navigate = useNavigate();

  async function findUser(data: FindUserFormSchema) {
    try {
      const response = await api.post(
        `events/${findEvent?.uuid_evento}/inscricoes/find`,
        data
      );

      navigate(
        `/pagamento/${response.data.uuid_lote}/usuario/${response.data.uuid_user}`
      );
    } catch (err) {
      console.log('Erro ao buscar usuario');
    }
  }

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
        <form onSubmit={handleSubmit(findUser)}>
          <div className="my-4">
            <Input
              {...register('email')}
              className="text-base"
              type="email"
              placeholder="E-mail"
            />
          </div>
          <DialogFooter>
            <button
              disabled={isSubmitting}
              className="button-secondary text-base disabled:opacity-70"
              type="submit"
            >
              Buscar
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
