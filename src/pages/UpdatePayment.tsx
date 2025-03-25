import { BrickCardMpRefreshPayment } from '@/components/shared/BrickMP';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from '@mercadopago/sdk-react/esm/bricks/cardPayment/type';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

function UpdatePayment() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const { data, isFetching } = useUserRegistrationInEvent(
    findEvent?.uuid_evento
  );
  const navigate = useNavigate();
  const userLote: { uuid_lote: string; uuid_evento: string; preco: number } =
    data?.lote;
  const { status_pagamento } = data;

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      return navigate('/sign-in');
    }
    if (status_pagamento === 'REALIZADO') {
      toast.error('Você já realizou o pagamento');
      return navigate(`/pagamentos/${slug}`);
    }
    if (!isFetching && !data) {
      toast.error('Você não está inscrito neste evento');
      return navigate(`/eventos/${slug}`);
    }
  }, []);

  if (isFetching) {
    return <div>Carregando...</div>;
  }

  const handleSubscribeInEvent = async (
    paymentData?: ICardPaymentFormData<ICardPaymentBrickPayer>
  ) => {
    if (!token) {
      return navigate('/sign-in');
    }
    setIsSubmitting(true);

    let payload: {
      paymentData?: ICardPaymentFormData<ICardPaymentBrickPayer>;
      atividades?: string[];
    } = paymentData ? { paymentData: paymentData } : {};
    try {
      await api.post(`/lote/${userLote.uuid_lote}/create-new-payment`, payload);
      toast.success('Pagamento atualizado com sucesso!');
      navigate(`/pagamentos/${slug}`, { replace: true });
    } catch (error) {
      toast.error('Erro ao atualizar Pagamento');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        {userLote ? (
          <div className="rounded-md bg-white p-8 w-full gap-4 flex flex-col  items-center justify-center">
            <div className="grid grid-cols-2 gap-5 ">
              <Toggle
                onClick={() => setPaymentMethod('pix')}
                className={`border-[1px] border-black px-4 py-2 transition-all duration-300 ${
                  paymentMethod === 'pix'
                    ? 'border-red-600 shadow-lg shadow-red-600'
                    : ''
                }`}
              >
                Pix
              </Toggle>
              <Toggle
                onClick={() => setPaymentMethod('card')}
                className={`border-[1px] border-black px-4 py-2 transition-all duration-300 ${
                  paymentMethod === 'card'
                    ? 'border-red-600 shadow-lg shadow-red-600'
                    : ''
                }`}
              >
                Cartão
              </Toggle>
            </div>

            {paymentMethod === 'pix' ? (
              <div className="flex items-center justify-center p-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="default"
                      className="bg-red-500 hover:bg-red-800"
                    >
                      Inscrever-se
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Confirmação de inscrição?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Você está prestes a realizar uma transação via PIX, tem
                        certeza que deseja continuar?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isSubmitting}
                        onClick={() => handleSubscribeInEvent()}
                      >
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ) : null}
            {paymentMethod === 'card' ? (
              <BrickCardMpRefreshPayment
                amount={userLote.preco + userLote.preco * 0.0498}
                loteId={userLote.uuid_lote}
              />
            ) : null}
          </div>
        ) : null}
      </Container>
    </>
  );
}

export default UpdatePayment;
