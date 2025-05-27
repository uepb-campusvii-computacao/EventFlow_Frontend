import { Activities } from '..';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

type props = {
  activities: Activities;
  activityDetails: {
    key: keyof Activities;
    label: string;
    color: string;
  }[];
  selectedActivities: string[];
  setSelectedActivities: (value: React.SetStateAction<string[]>) => void;
};

export function ActivitySection({
  activities,
  activityDetails,
  selectedActivities,
  setSelectedActivities,
}: props) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-center text-3xl font-bold">Atividades</h1>
      {activityDetails.map(({ key, label, color }) => {
        const activitiesPerType = activities[key];
        const turnos = activitiesPerType
          ? Object.entries(activitiesPerType)
          : [];

        if (turnos.length === 0) return null;

        return (
          <div key={key} className="w-full max-w-3xl space-y-6">
            <h2 className={`text-2xl font-semibold text-${color}-600`}>
              {label}
            </h2>

            {turnos.map(([turno, lista]) => {
              const selectedId = selectedActivities.find((id) =>
                lista.some((a) => a.uuid_atividade === id)
              );
              const handleChange = (selected: string) => {
                if (selected === 'none') {
                  const otherIdsSameTurno =
                    turnos
                      .find(([t]) => t === turno)?.[1]
                      .map((a) => a.uuid_atividade) || [];

                  const updated = selectedActivities.filter(
                    (id) => !otherIdsSameTurno.includes(id)
                  );
                  setSelectedActivities(updated);
                  return;
                }

                const updated = [...selectedActivities, selected];
                setSelectedActivities(updated);
              };

              return (
                <div
                  key={turno}
                  className="bg-blue-100 p-4 rounded-md border shadow-sm"
                >
                  <label className="block mb-2 font-medium text-gray-700">
                    Turno: {turno}
                  </label>
                  <Select
                    defaultValue={selectedId || ''}
                    onValueChange={handleChange}
                  >
                    <SelectTrigger
                      className={`w-full rounded border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-${color}-500`}
                    >
                      <SelectValue placeholder="Selecione a atividade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="none"
                        className="text-slate-900 hover:bg-slate-600"
                      >
                        Nenhuma
                      </SelectItem>
                      {lista.map((a) =>
                        a.max_participants ? (
                          a._count < a.max_participants ? (
                            <SelectItem
                              className="text-slate-900 hover:bg-slate-200"
                              key={a.uuid_atividade}
                              value={a.uuid_atividade}
                            >
                              {`${a.nome} [${a._count}/${a.max_participants}]`}
                            </SelectItem>
                          ) : (
                            <SelectItem
                              disabled
                              className="text-slate-900 hover:bg-slate-200"
                              key={a.uuid_atividade}
                              value={'nula'}
                            >
                              {`${a.nome} [LOTADA]`}
                            </SelectItem>
                          )
                        ) : (
                          <SelectItem
                            className="text-slate-900 hover:bg-slate-200"
                            key={a.uuid_atividade}
                            value={a.uuid_atividade}
                          >
                            {`${a.nome} [${a._count}/${a.max_participants}]`}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
