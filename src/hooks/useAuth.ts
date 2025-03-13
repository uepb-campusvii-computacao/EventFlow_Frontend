import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

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

export async function fetchUserData() {
  try {
    const response = await api.get('/user');

    return { ...response.data, initials: generateInitials(response.data.nome) };
  } catch (err) {
    console.log(err);
  }
}

export function useAuth() {
  return useQuery({
    queryFn: fetchUserData,
    queryKey: ['user-data'],
  });
}
