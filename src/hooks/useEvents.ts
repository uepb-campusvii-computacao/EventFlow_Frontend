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

async function fetchEventsByUser(): Promise<Event[]> {
  try {
    const response = await api.get('/user/my-events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events data:', error);
    throw error;
  }
}

function getEventBySlug(
  queryClient: ReturnType<typeof useQueryClient>,
  slug: string
): Event | undefined {
  try {
    const events = queryClient.getQueryData<Event[]>(['events-data']);
    if (!events) {
      return undefined;
    }
    return events.find((event) => event.slug === slug);
  } catch (error) {
    console.error('Error searching events:', error);
    throw new Error('Error searching events');
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

  const eventsQueryByUser = useQuery({
    queryFn: () => fetchEventsByUser(),
    queryKey: ['user-events'],
  });

  const isSearching = Boolean(query && query.trim());
  const searchedEvents = isSearching
    ? searchEvent(queryClient, query || '')
    : [];

  const findEvent = isSearching
    ? getEventBySlug(queryClient, query || '')
    : undefined;

  return {
    eventsQuery,
    eventsQueryByUser,
    findEvent,
    searchedEvents,
    isSearching,
  };
}
