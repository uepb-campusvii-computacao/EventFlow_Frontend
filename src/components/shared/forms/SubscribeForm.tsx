import { Input } from '@/components/ui/input';
import { useEventBatchs } from '@/hooks/useEventBatchs';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { SearchPayment } from '../payments/SearchPayment';

const subscribeFormSchema = z.object({
  batch_id: z.string(),
  name: z.string(),
  email: z.string().email(),
  college: z.string(),
  name_tag: z.string(),
});

type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>;

export function SubscribeForm() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { findEvent } = useEvents(slug);

  const { data: batchs } = useEventBatchs(findEvent?.uuid_evento || '');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  async function handleRegisterSubscriberInEvent(data: SubscribeFormSchema) {
    console.log(data);
    try {
      const lote_id = data.batch_id ?? (batchs?.[0]?.uuid_lote);

      const response = await api.post(`/register/${slug}`, {
        nome: data.name,
        email: data.email,
        instituicao: data.college,
        nome_cracha: data.name_tag,
        lote_id,
      });

      navigate(
        `/pagamento/${data.batch_id}/usuario/${response.data.uuid_user}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleBatchClick(id: string) {
    setSelectedBatch(id);
    setValue('batch_id', id);
  }

  return (
    <form
      className="flex w-full flex-col items-center justify-between gap-4 rounded-md border-2 bg-white p-8 shadow-md sm:w-[60%]"
      onSubmit={handleSubmit(handleRegisterSubscriberInEvent)}
    >
      <h1 className="mx-4 text-2xl font-medium">Escolha o lote</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {batchs &&
          batchs.map((item) => (
            <div
              key={item.uuid_lote}
              className={`flex w-full cursor-pointer flex-col rounded-md border-2 p-8 shadow-md ${
                selectedBatch === item.uuid_lote
                  ? 'border-blue-500'
                  : 'border-accent'
              }`}
              onClick={() => handleBatchClick(item.uuid_lote)}
            >
              <strong className="text-lg font-medium">{item.nome}</strong>
              <p className="font-light">{item.descricao}</p>
              <span className="mt-2 font-mono text-base">
                R${' '}
                {item.preco.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        <input required type="hidden" {...register('batch_id')} />
        {errors.batch_id && (
          <p className="text-red-500">{errors.batch_id.message}</p>
        )}
      </div>
      <h1 className="text-2xl font-medium">Preencha seus dados</h1>
      <div className="grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
        <Input
          required
          className="text-lg"
          type="text"
          placeholder="Nome Completo"
          {...register('name')}
        />
        <Input
          required
          className="text-lg"
          type="email"
          placeholder="Email"
          {...register('email')}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
        <Input
          required
          className="text-lg"
          type="text"
          placeholder="Instituição"
          {...register('college')}
        />
        <Input
          required
          className="text-lg"
          type="text"
          placeholder="Nome no crachá"
          {...register('name_tag')}
        />
      </div>

      <div className="mt-4 grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
        <Link to={`/eventos/${slug}`} className="button-secondary">
          Voltar
        </Link>
        <button
          disabled={isSubmitting}
          type="submit"
          className="button-primary disabled:opacity-70 transition-opacity"
        >
          Inscreve-se
        </button>
      </div>
      <SearchPayment />
    </form>
  );
}
