import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface Activity {
  uuid_atividade: string;
  nome: string;
  max_participants: number;
  tipo_atividade: string;
  _count: number;
}

interface ActivityData {
  [key: string]: Activity[];
}

interface EditActivitiesProps {
  data: ActivityData;
  selectedActivities?: { [key: string]: string }; 
  onSelect: (selected: { [key: string]: string }) => void;
}

export function EditActivities({
  data,
  selectedActivities = {},
  onSelect,
}: EditActivitiesProps) {
  const [selected, setSelected] = useState<{ [key: string]: string }>(
    selectedActivities
  );

  const handleSelect = (activityId: string, type: string) => {
    const updatedSelection = { ...selected, [type]: activityId };
    setSelected(updatedSelection);
    onSelect(updatedSelection);
  };

  return (
    <div className="flex flex-col gap-10 w-full bg-white p-7 rounded-lg text-black shadow">
      {Object.entries(data).map(([type, activities]) =>
        activities.length > 0 ? (
          <div key={type} className="flex flex-col">
            <label className="text-gray-700 font-semibold mb-2 capitalize">
              {type + 's'}
            </label>

            <Select onValueChange={(value) => handleSelect(value, type)}>
              <SelectTrigger>
                <SelectValue placeholder={type + 's'} />
              </SelectTrigger>
              <SelectContent>
                {activities.map((activity) => (
                  <SelectItem
                    key={activity.uuid_atividade}
                    value={activity.uuid_atividade}
                  >
                    {activity.nome} - Vagas ({activity._count}/
                    {activity.max_participants})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null
      )}
    </div>
  );
}
