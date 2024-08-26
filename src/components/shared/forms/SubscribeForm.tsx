import { Input } from '@/components/ui/input';
import { useEventBatchs } from '@/hooks/useEventBatchs';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import { SearchPayment } from '../payments/SearchPayment';
import { SkeletonLoader } from '../skeletonLoader';

const subscribeFormSchema = z.object({
  batch_id: z.string().min(1, 'Lote é um campo obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
  college: z.string().min(1, 'Instituição é obrigatória'),
  name_tag: z.string().min(1, 'Nome no crachá é obrigatório'),
});

type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>;

export function SubscribeForm() {
  const { slug } = useParams<{ slug: string }>();
  const { findEvent } = useEvents(slug);
  const { data: batchs, isLoading: isBatchsLoading } = useEventBatchs(
    findEvent?.uuid_evento || ''
  );
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    trigger,
    setValue,
    formState: { errors, isSubmitting: isFormSubmitting },
  } = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  async function handleRegisterSubscriberInEvent(data: SubscribeFormSchema) {
    try {
      const lote_id = data.batch_id ?? batchs?.[0]?.uuid_lote;
      await api.post(`/register/${slug}`, {
        nome: data.name,
        email: data.email,
        instituicao: data.college,
        nome_cracha: data.name_tag,
        lote_id,
      });

      //Função utilizada no sercomp
      //navigate(`/pagamento/${lote_id}/usuario/${response.data.uuid_user}`);

      window.location.href = 'https://payment-link.stone.com.br/pl_3y4vLelgk9pPRAqsO3IEVQ20MRxbmjo5'
    } catch (error: any) {
      const errorMessage =
        error?.response?.data || 'Ocorreu um erro ao registrar o usuário';
      toast.error(errorMessage);
      console.log(error);
    }
  }

  function handleBatchClick(id: string) {
    setSelectedBatch(id);
    setValue('batch_id', id);
  }

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <form
        className="flex w-full mx-auto flex-col items-center justify-between gap-4"
        onSubmit={handleSubmit(handleRegisterSubscriberInEvent)}
      >
        <h1 className="mx-4 text-2xl font-semibold">Escolha o lote</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-full">
          {isBatchsLoading ? (
            <SkeletonLoader amount={3} className="h-48" />
          ) : (
            batchs &&
            batchs.map((item) => (
              <div
                key={item.uuid_lote}
                className={`flex w-full cursor-pointer flex-col rounded-md border-2 p-8 shadow-md ${
                  selectedBatch === item.uuid_lote
                    ? 'border-blue-500'
                    : 'border-accent'
                }`}
                onClick={() => {
                  handleBatchClick(item.uuid_lote);
                  trigger('batch_id');
                }}
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
            ))
          )}
          <input required type="hidden" {...register('batch_id')} />
        </div>
        {errors.batch_id && (
          <p className="text-red-500 font-semibold">
            {errors.batch_id.message}
          </p>
        )}
        <h1 className="text-2xl font-medium">Preencha seus dados</h1>
        <div className="grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div className="w-full">
            <Input
              className={`text-lg ${errors.name && 'border-2 border-red-500'}`}
              placeholder="Nome Completo"
              {...register('name')}
              onBlur={() => trigger('name')}
            />
            {errors.name && (
              <p className="text-red-500 font-semibold">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={`text-lg ${errors.email && 'border-2 border-red-500'}`}
              placeholder="Email"
              {...register('email')}
              onBlur={() => trigger('email')}
            />
            {errors.email && (
              <p className="text-red-500 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
          <div className="w-full">
            <Input
              className={`text-lg ${errors.college && 'border-2 border-red-500'}`}
              placeholder="Instituição"
              {...register('college')}
              onBlur={() => trigger('college')}
            />
            {errors.college && (
              <p className="text-red-500 font-semibold">
                {errors.college.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              className={`text-lg ${errors.name_tag && 'border-2 border-red-500'}`}
              placeholder="Nome no crachá"
              {...register('name_tag')}
              onBlur={() => trigger('name_tag')}
            />
            {errors.name_tag && (
              <p className="text-red-500 font-semibold">
                {errors.name_tag.message}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
          <Link to={`/eventos/${slug}`} className="button-secondary">
            Voltar
          </Link>
          <button
            disabled={isFormSubmitting}
            type="submit"
            className={`button-primary disabled:opacity-70 transition-opacity ${isFormSubmitting && 'animate-pulse'}`}
          >
            {isFormSubmitting ? 'Carregando...' : 'Inscreva-se'}
          </button>
        </div>
      </form>
      <SearchPayment />
    </div>
  );
}
