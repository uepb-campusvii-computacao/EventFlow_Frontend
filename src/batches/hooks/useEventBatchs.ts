import { api } from "@/lib/api";
import { EventBatch } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function fetchBatchsInEvents(event_id: string): Promise<EventBatch[]> {
  try {
    const response = await api.get(`/events/${event_id}/lotes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching batchs in events:', error);
    throw error;
  }
}

export function useEventBatchs(event_id: string) {
  const batchsQuery = useQuery({
    queryFn: () => fetchBatchsInEvents(event_id),
    queryKey: ['batchs-data', event_id],
    enabled: !!event_id, 
  });

  return batchsQuery;
}
