import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

function generateInitials(name: string) {
  const words = name.trim().split(' ');

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  } else {
    const firstLetter = words[0][0].toUpperCase();
    const lastLetter = words[words.length - 1][0].toUpperCase();
    return firstLetter + lastLetter;
  }
}

async function fetchUserData(token: string | undefined) {
  if (!token) {
    throw new Error('No token available');
  }

  try {
    const response = await api.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { ...response.data, initials: generateInitials(response.data.nome) };
  } catch (err) {
    console.log(err);
  }
}

export function useAuth() {
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  return useQuery({
    queryFn: () => fetchUserData(token),
    queryKey: ['user-data'],
  });
}
