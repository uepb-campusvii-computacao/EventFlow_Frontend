import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export async function getUserRegistrationInEvent(eventId: string) {
  try {
    const response = await api.get(`/user/in-event/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar inscrição no evento:', error);
    throw error;
  }
}

export function useUserRegistrationInEvent(eventId?: string) {
  return useQuery({
    queryFn: () => (eventId && getUserRegistrationInEvent(eventId)),
    queryKey: ['user-registration', eventId],
  });
}

// export function useRegisterGuestsInEvent(data: any) {
//   return useMutation({
//     mutationFn: async () => {
//       //funcao
//     },
//     mutationKey: ['register-guests'],
//   });
// }
