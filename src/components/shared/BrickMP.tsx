import { CardPayment, initMercadoPago, StatusScreen } from '@mercadopago/sdk-react';
import { ICardPaymentBrickPayer, ICardPaymentFormData } from '@mercadopago/sdk-react/esm/bricks/cardPayment/type';
import { useEffect } from 'react';

export function BrikcCardMp() {

  useEffect(() => {
    initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);
  }, []);

  const onSubmit = async (formData: ICardPaymentFormData<ICardPaymentBrickPayer>) => {
    // callback chamado ao clicar no botão de submissão dos dados
    const response = await fetch('/process_payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json());

    //coletar o token e fazer a requisição para o backend
    console.log(response);
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
      initialization={{ amount: 100 }}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
}

export function StatusBrickMp({paymentId}: {paymentId: string}) {
  const initialization = {
    paymentId, // id do pagamento a ser mostrado
  };
  const onError = async (error: any) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
  };

  return (
    <StatusScreen
      initialization={initialization}
      onReady={onReady}
      onError={onError}
    />
  );
}
