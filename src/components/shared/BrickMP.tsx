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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY, {
  locale: 'pt-BR',
  advancedFraudPrevention: true,
});
async function registerPayment(loteId: string, paymentData: any, selectedActivities: string[]) {
  try {
    const response = await api.post(`/lote/${loteId}/register`, {
      paymentData,
      atividades: selectedActivities
    });
    return response.data;
  } catch (error) {
    console.log(error)
    toast.error('Erro ao registrar inscrição');
  }
}

export function BrickCardMp({
  amount,
  loteId,
  selectedActivities,
}: {
  amount: number;
  loteId: string;
  selectedActivities: string[];
}) {
  const customization = {
    paymentMethods: {
      minInstallments: 1,
      maxInstallments: 12,
    },
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payload: any) => registerPayment(loteId, payload, selectedActivities),
    mutationKey: ['register-payment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-registration'] });
    },
  });

  const navigate = useNavigate();
  const { slug } = useParams();
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
    try {
      mutate(payload.paymentData);
      navigate(`/pagamentos/${slug}`);
    } catch (error) {
      console.error('Erro ao registrar inscrição:', error);
      throw error;
    } finally {
    }
  };
  const onError = async (error: any) => {
    console.log(error);
  };

  return (
    <>
    <CardPayment
      initialization={initialization}
      onSubmit={onSubmit}
      customization={customization}
      onError={onError}
    />
    <input type="hidden" id="deviceId" />
    </>
  );
}

async function registerNewPayment(loteId: string, paymentData: any) {
  try {
    const response = await api.post(`/lote/${loteId}/create-new-payment`, {
      paymentData,
    });
    return response.data;
  } catch (error) {
    toast.error('Erro ao registrar novo pagamento');
  }
}

export function BrickCardMpRefreshPayment({
  amount,
  loteId,
}: {
  amount: number;
  loteId: string;
}) {
  const customization = {
    paymentMethods: {
      minInstallments: 1,
      maxInstallments: 12,
    },
  };
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (payload: any) => registerNewPayment(loteId, payload),
    mutationKey: ['register-payment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-registration'] });
    },
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
    try {
      mutate(payload.paymentData);
      navigate(`/pagamentos/${slug}`, { replace: true });
    } catch (error) {
      console.error('Erro ao registrar novo pagamento:', error);
      throw error;
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
