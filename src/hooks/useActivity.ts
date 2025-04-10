import { api } from "@/lib/api";
import { Activities } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function fetchActivitiesInEvent(event_id: string): Promise<Activities> {
  try {
    const response = await api.get(`/events/${event_id}/allAtividades/shift`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activities in event:', error);
    throw error;
  }
}

export function useActivities(event_id: string) {
  const activitiesQuery = useQuery({
    queryFn: () => fetchActivitiesInEvent(event_id),
    queryKey: ['activities-data', event_id],
    enabled: !!event_id, 
  });

  return activitiesQuery;
}
