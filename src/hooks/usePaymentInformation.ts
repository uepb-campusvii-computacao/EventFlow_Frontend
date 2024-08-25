///lote/:lote_id/inscricoes/user/:user_id/

import { api } from "@/lib/api";
import { UserSubscription } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function fetchPaymentInformation(batch_id: string, user_id: string): Promise<UserSubscription> {
  try {
    const response = await api.get(`/lote/${batch_id}/inscricoes/user/${user_id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment information:', error);
    throw error;
  }
}

export function usePaymentInformation(params: {batch_id: string, user_id: string}) {
  const paymentInformationQuery = useQuery({
    queryFn: () => fetchPaymentInformation(params.batch_id, params.user_id),
    queryKey: ['batchs-data', params],
    enabled: !!params, 
  });

  return paymentInformationQuery;
}
