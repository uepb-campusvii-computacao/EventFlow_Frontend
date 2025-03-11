import { BrickCardMp } from '@/components/shared/BrickMP';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { useEventBatchs } from '@/hooks/useEventBatchs';
import { useUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const guestSchema = z.object({
  name: z.string().nonempty('Nome é Obrigatório!'),
  cpf: z.string().nonempty('CPF é Obrigatório!'),
  email: z.string().email('Email invalido').nonempty('Email é Obrigatório!'),
  organization: z.string(),
  nickname: z.string(),
});

const registerGuestSchema = z.object({
  guests: z.array(guestSchema).max(2),
});

type RegisterGuestSchema = z.infer<typeof registerGuestSchema>;

export function Event() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const { data: batchs } = useEventBatchs(findEvent?.uuid_evento || '');
  const { data, isFetching, refetch } = useUserRegistrationInEvent(
    findEvent?.uuid_evento
  );
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting: isSubmittingForm },
  } = useForm<RegisterGuestSchema>({
    resolver: zodResolver(registerGuestSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'guests',
  });

  enum PaymentStatus {
    PENDENTE = 'PAGAMENTO PENDENTE',
    REALIZADO = 'VER COMPROVANTE',
    CANCELADO = 'INSCRIÇÃO CANCELADA',
    EXPIRADO = 'PAGAMENTO EXPIRADO',
  }

  const statusPagamento = PaymentStatus;
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedBatchValue, setSelectedBatchValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usersIds, setUsersIds] = useState<string[]>([]);

  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const handleRegisterGuests = async (data: RegisterGuestSchema) => {
    if (!token) {
      return navigate('/sign-in');
    }
    if (!selectedBatch) {
      return toast.error('Selecione um lote!');
    }
    setIsSubmitting(true);

    try {
      const responseArray = await Promise.all(
        data.guests.map((guest) => {
          return api.post(`/user/registerGuest`, guest, {
            headers: { Authorization: `Bearer ${token}` },
          });
        })
      );

      const usersIds = responseArray.map((response: AxiosResponse) => {
        return response.data.uuid_usuario;
      });
      setUsersIds(usersIds);
    } catch (error) {
      toast.error('Erro ao se inscrever no evento!');
    } finally {
      refetch();
      setIsSubmitting(false);
      navigate(`/pagamentos/${slug}`);
    }
  };

  const handleSubscribeInEvent = async () => {
    if (!token) {
      return navigate('/sign-in');
    }
    if (!selectedBatch) {
      return toast.error('Selecione um lote!');
    }
    setIsSubmitting(true);

    try {
      await api.post(`/lote/${selectedBatch}/register`, usersIds, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      toast.error('Erro ao se inscrever no evento!');
    } finally {
      refetch();
      setIsSubmitting(false);
      navigate(`/pagamentos/${slug}`);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  function BatchButtons() {
    return (
      <>
        {batchs?.map((item) => (
          <button
            key={item.uuid_lote}
            onClick={() => {
              setSelectedBatch(item.uuid_lote || '');
              setSelectedBatchValue(item.preco);
            }}
            className={`rounded-md shadow-md border sm:w-auto w-full bg-slate-100 p-4 flex flex-col gap-1 ${
              selectedBatch === item.uuid_lote
                ? 'border-purple-500'
                : 'border-accent'
            }`}
          >
            <h2 className="font-semibold text-lg">{item.nome}</h2>
            <span className="font-light">{item.descricao}</span>
            <span className="font-semibold">
              R$ {item.preco.toFixed(2).replace('.', ',')}
            </span>
          </button>
        ))}
      </>
    );
  }

  function MultipleUsers() {
    return (
      <form
        onSubmit={handleSubmit(handleRegisterGuests)}
        className="flex flex-col gap-4"
      >
        <button
          type="button"
          onClick={() => {
            if (fields.length < 2) {
              append({
                name: '',
                cpf: '',
                email: '',
                organization: '',
                nickname: '',
              });
            }
          }}
        >
          Adicionar Convidado
        </button>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-1">
            <h1>Convidado {index + 1}</h1>
            {errors.guests?.[index]?.name && (
              <div className="text-sm text-red-500">
                {errors.guests[index].name?.message}
              </div>
            )}
            <input
              className="focus:ring-purple-500"
              placeholder="Nome completo"
              type="text"
              {...register(`guests.${index}.name` as const)}
            />
            {errors.guests?.[index]?.cpf && (
              <div className="text-sm text-red-500">
                {errors.guests[index].cpf?.message}
              </div>
            )}
            <input
              className="focus:ring-purple-500"
              placeholder="CPF"
              type="text"
              {...register(`guests.${index}.cpf` as const)}
            />
            {errors.guests?.[index]?.email && (
              <div className="text-sm text-red-500">
                {errors.guests[index].email?.message}
              </div>
            )}
            <input
              className="focus:ring-purple-500"
              placeholder="E-mail"
              type="email"
              {...register(`guests.${index}.email` as const)}
            />
            {errors.guests?.[index]?.nickname && (
              <div className="text-sm text-red-500">
                {errors.guests[index].nickname?.message}
              </div>
            )}
            <input
              className="focus:ring-purple-500"
              placeholder="Nome do crachá"
              type="text"
              {...register(`guests.${index}.nickname` as const)}
            />
            {errors.guests?.[index]?.organization && (
              <div className="text-sm text-red-500">
                {errors.guests[index].organization?.message}
              </div>
            )}
            <input
              className="focus:ring-purple-500"
              placeholder="Instituição"
              type="text"
              {...register(`guests.${index}.organization` as const)}
            />
            <button type="button" onClick={() => remove(index)}>
              Remover
            </button>
          </div>
        ))}
        <button
          disabled={isSubmittingForm}
          type="submit"
          className="mt-4 flex items-center justify-center rounded-md bg-purple-500 px-3 py-2 text-center text-white transition-colors hover:bg-purple-600 disabled:bg-purple-800"
        >
          {isSubmittingForm ? 'Carregando...' : 'Confirmar Convidados'}
        </button>
      </form>
    );
  }

  function InscriptionSection() {
    return (
      <div className="rounded-md border-2 bg-white p-8 shadow-md w-full gap-4 flex flex-col items-center justify-center">
        <div className="flex gap-2 flex-wrap w-full">
          <BatchButtons />
        </div>

        <MultipleUsers />

        {selectedBatchValue > 0 ? (
          <div>
            <label>
              <input
                type="radio"
                value="pix"
                name="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod === 'pix'}
              />{' '}
              PIX
            </label>
            <label>
              <input
                type="radio"
                value="card"
                name="paymentMethod"
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod === 'card'}
              />{' '}
              Cartão
            </label>
          </div>
        ) : null}

        {selectedBatch != '' ? (
          paymentMethod === 'pix' ? (
            <button
              disabled={isSubmitting}
              onClick={handleSubscribeInEvent}
              className="rounded-md px-3 py-2 font-semibold text-white text-center bg-purple-500 text-lg hover:bg-purple-700 disabled:bg-purple-900"
            >
              Inscreve-se
            </button>
          ) : (
            <BrickCardMp amount={selectedBatchValue} loteId={selectedBatch} />
          )
        ) : null}
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-dvh w-full flex-col items-center gap-4 pb-16 pt-8">
          <img
            className="w-full h-auto rounded-md border-2 shadow-md"
            src={findEvent?.banner_img_url}
            alt="Banner do evento"
            width={160}
          />

          {findEvent?.conteudo && (
            <div className="rounded-md border-2 bg-white p-8 shadow-md w-full">
              <div
                className="w-full prose-sm"
                dangerouslySetInnerHTML={{ __html: findEvent?.conteudo }}
              ></div>
            </div>
          )}

          {isFetching ? (
            <div>Carregando...</div>
          ) : (
            <>
              {new Date() >= new Date(findEvent?.date || '') ? (
                <div className="w-full px-8 rounded-md border-2 bg-white justify-center p-8 shadow-md flex-col gap-4 sm:gap-16 sm:flex-row">
                  <h1 className="text-center text-2xl font-semibold">
                    Inscrições <span className="text-red-500">ENCERRADAS</span>!
                  </h1>
                </div>
              ) : token ? (
                <>
                  {!data.isSubscribed ? (
                    <InscriptionSection />
                  ) : (
                    <div>
                      <Button
                        className="data-[status=PENDENTE]:bg-yellow-300 data-[status=REALIZADO]:bg-green-600 data-[status=CANCELADO]:bg-red-300"
                        data-status={data.status_pagamento}
                      >
                        <Link to={`/pagamentos/${slug}`}>
                          {
                            statusPagamento[
                              data.status_pagamento as keyof typeof PaymentStatus
                            ]
                          }
                        </Link>
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/sign-in">Faça o login</Link>
              )}
            </>
          )}
        </main>
      </Container>
    </>
  );
}
