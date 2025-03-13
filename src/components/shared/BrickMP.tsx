import { api } from '@/lib/api';
import {
  CardPayment,
  initMercadoPago,
  StatusScreen,
} from '@mercadopago/sdk-react';
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from '@mercadopago/sdk-react/esm/bricks/cardPayment/type';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);
async function  registerPayment(loteId: string, paymentData: ICardPaymentFormData<ICardPaymentBrickPayer>) {
  const response = await api.post(`/lote/${loteId}/register`,
    paymentData
  )
  return response.data;
}
  
export function BrickCardMp({
  amount,
  loteId,
}: {
  amount: number;
  loteId: string;
}) {
  const customization = {
    paymentMethods: {
      minInstallments: 1,
      maxInstallments: 5,
    },
  };
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
     mutationFn: (payload: any)=> registerPayment(loteId, payload)
     ,
     mutationKey: ['register-payment'],
     onSuccess: () => {
       queryClient.invalidateQueries({queryKey:['user-registration']});
     }
  });

  const navigate = useNavigate();
  const { slug } = useParams();
  //pegar o preço do lote - nao implementado
  const initialization = {
    amount: amount || 0,
  };

  const onSubmit = async (
    formData: ICardPaymentFormData<ICardPaymentBrickPayer>
  ) => {
    const payload = {
      paymentMethod: 'CARD',
      paymentData: formData,
    };
    try{
      mutate(payload.paymentData);
      navigate(`/pagamentos/${slug}`)
    } 
    catch (error) {
      console.error('Erro ao registrar inscrição:', error);
      throw error;
    }
    finally {
    
    }

  };
  const onError = async (error: any) => {
    console.log(error);
  };

  return (
    <CardPayment
      initialization={initialization}
      onSubmit={onSubmit}
      customization={customization}
      onError={onError}

    />
  );
}

export function StatusBrickMp({ paymentId }: { paymentId: string }) {
  const initialization = {
    paymentId, // id do pagamento a ser mostrado
  };
  const onError = async (error: any) => {
    console.log(error);
  };

  return <StatusScreen initialization={initialization} onError={onError} />;
}