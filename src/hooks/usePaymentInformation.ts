///lote/:lote_id/inscricoes/user/:user_id/

import { api } from '@/lib/api';
import { UserSubscription } from '@/types';
import { useQuery } from '@tanstack/react-query';

async function fetchPaymentInformation(
  batch_id: string,
  user_id: string
): Promise<UserSubscription> {
  try {
    const userInfoPromise = api.get(
      `/lote/${batch_id}/inscricoes/user/${user_id}/`
    );
    const paymentInfoPromise = api.get(
      `/pagamento/user/${user_id}/lote/${batch_id}`
    );

    const [responseUserInfo, responsePaymentInfo] = await Promise.all([
      userInfoPromise,
      paymentInfoPromise,
    ]);

    return {
      ...responseUserInfo.data,
      payment: { ...responsePaymentInfo.data },
    };
  } catch (error) {
    console.error('Error fetching payment information:', error);
    throw error;
  }
}

export function usePaymentInformation(params: {
  batch_id: string;
  user_id: string;
}) {
  const paymentInformationQuery = useQuery({
    queryFn: () => fetchPaymentInformation(params.batch_id, params.user_id),
    queryKey: ['batchs-data', params],
    enabled: !!params,
  });

  return paymentInformationQuery;
}
