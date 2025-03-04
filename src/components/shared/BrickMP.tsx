import {
  CardPayment,
  initMercadoPago,
  StatusScreen,
} from '@mercadopago/sdk-react';
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from '@mercadopago/sdk-react/esm/bricks/cardPayment/type';
import { api } from '@/lib/api';

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);
export function BrickCardMp() {
  

  const customization = {
    paymentMethods: {
      minInstallments: 1,
      maxInstallments: 5,
    },
  };

  //pegar o preço do lote
  const initialization = {
    amount: 100,
  };

  const onSubmit = async (
    formData: ICardPaymentFormData<ICardPaymentBrickPayer>
  ) => {
    /*
    {
      installments: 1,
      issuer_id: "24",
      payer: {
        email: "jonh@gmail.com", 
        identification: {type: "CPF", number: "12345678900"}
      },
      payment_method_id: "master",
      token: "987982375fg070wsd01919290",
      transaction_amount: 1
    }
    */
    //fazer chamada no backend
    api.post('/lote/:lote_id/register', formData)
  };
  const onError = async (error: any) => {
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
  };

  return (
    <CardPayment
      initialization={initialization}
      onSubmit={onSubmit}
      customization={customization}
      onReady={onReady}
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
  const onReady = async () => {
    
  };

  return (
    <StatusScreen
      initialization={initialization}
      onReady={onReady}
      onError={onError}
    />
  );
}
