import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

async function getUserRegistrationInEvent(token: string, eventId: string) {
  try {
    const response = await api.get(`/user/in-event/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar inscrição no evento:', error);
    throw error;
  }
}

export function useUserRegistrationInEvent(eventId?: string) {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  return useQuery({
    queryFn: () => (eventId && token ? getUserRegistrationInEvent(token, eventId) : Promise.reject(new Error('Token ou eventId não informado'))),
    queryKey: ['user-registration', eventId],
    enabled: !!eventId && !!token,
  });
}
