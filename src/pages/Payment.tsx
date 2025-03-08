import { StatusBrickMp } from '@/components/shared/BrickMP';
import { Header } from '@/components/shared/Header';
import { useUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

export function Payment() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const {
    data,
    isFetching,
    error,
  } = useUserRegistrationInEvent(findEvent?.uuid_evento);

  const id_payment_mercado_pago = data?.id_payment_mercado_pago;
  const isSubscribed = data?.isSubscribed;

  const navigate = useNavigate();

  if (!isSubscribed) {
    navigate('/');
  }

  if (error) {
    toast.error('Erro no servidor! Tente novamente mais tarde :(');
  }

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
