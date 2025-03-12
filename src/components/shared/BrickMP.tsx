import {
  CardPayment,
  initMercadoPago,
  StatusScreen,
} from '@mercadopago/sdk-react';
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from '@mercadopago/sdk-react/esm/bricks/cardPayment/type';

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

export function BrickCardMp({ amount }: { amount: number }) {
  const customization = {
    paymentMethods: {
      minInstallments: 1,
      maxInstallments: 5,
    },
    visual: {
      style: {
        customVariables: {
          baseColor: 'red',
        },
      },
    },
  };

  //pegar o preço do lote - nao implementado
  const initialization = {
    amount: amount || 0,
  };

  const onSubmit = async (
    formData: ICardPaymentFormData<ICardPaymentBrickPayer>
  ) => {};
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
