import { api } from '@/lib/api';
import { Event } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

async function fetchEventsData(): Promise<Event[]> {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events data:', error);
    throw error;
  }
}

function searchEvent(
  queryClient: ReturnType<typeof useQueryClient>,
  query: string
): Event[] {
  try {
    const events = queryClient.getQueryData<Event[]>(['events-data']);

    if (!events) {
      return [];
    }

    return events.filter((event) =>
      event.nome.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching events:', error);
    throw new Error('Error searching events');
  }
}

export function useEvents(query?: string) {
  const queryClient = useQueryClient();

  const eventsQuery = useQuery({
    queryFn: fetchEventsData,
    queryKey: ['events-data'],
  });

  const isSearching = Boolean(query && query.trim());
  const searchedEvents = isSearching
    ? searchEvent(queryClient, query || '')
    : [];

  return {
    eventsQuery,
    searchedEvents,
    isSearching,
  };
}
