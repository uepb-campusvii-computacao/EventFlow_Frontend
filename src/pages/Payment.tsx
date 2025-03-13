import { StatusBrickMp } from '@/components/shared/BrickMP';
import { Header } from '@/components/shared/Header';
import { getUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export function Payment() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const {data, isFetching, isError, isFetched} = useQuery({
      queryFn: () =>  getUserRegistrationInEvent(findEvent?.uuid_evento || ''),
      queryKey: ['user-registration'],
    });

  const id_payment_mercado_pago = data?.id_payment_mercado_pago;

  const navigate = useNavigate();

  if (isError) {
    toast.error('Erro no servidor! Tente novamente mais tarde :(');
  }
  useEffect(() => {
    if (isFetched && !data?.isSubscribed) {
      toast.error('Você não possui inscrição neste evento!');
      navigate('/');
    }
  },[])

  return (
    <>
      <Header />

      <main className="flex flex-col gap-5 min-h-[calc(100dvh-4rem)] w-full justify-center items-center bg-accent p-2 md:p-12">
        {isFetching ? (
          <div>Carregando...</div>
        ) : (
          <StatusBrickMp paymentId={id_payment_mercado_pago} />
        )}
      </main>
    </>
  );
}
