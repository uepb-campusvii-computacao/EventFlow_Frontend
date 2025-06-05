import { Card } from '@/components/shared/Card/Root';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Main } from '@/components/shared/Main';
import { SideBar } from '@/components/shared/SideBar/Root';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { api } from '@/lib/api';
import { profileLinks } from '@/lib/links';
import { ActivityTypes, Shifts } from '@/types';
import Cookies from 'js-cookie';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ProfileActivities() {
  const token = Cookies.get('token');

  const [activities, setActivities] = useState<
    | {
        id: string;
        nome: string;
        evento: string;
        descricao: string;
        tipo_atividade: string;
        presenca: boolean;
        data: string | Date;
        turno: string;
      }[]
    | null
  >(null);
  const [searchQueryName, setSearchQueryName] = useState<string | null>(null);
  const [searchQueryType, setSearchQueryType] = useState<ActivityTypes | null>(
    null
  );
  const [searchQueryPresence, setSearchQueryPresence] = useState<
    boolean | null
  >(null);
  const [searchQueryDateEnd, setSearchQueryDateEnd] = useState<Date | null>(
    null
  );
  const [searchQueryDateStart, setSearchQueryDateStart] = useState<Date | null>(
    null
  );
  const [searchQueryEvent, setSearchQueryEvent] = useState<string | null>(null);
  const [searchQueryShift, setSearchQueryShift] = useState<Shifts | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/user/activities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;
        setActivities(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-4rem-1px)]">
        <SideBar.Main items={profileLinks} />
        <Main className="w-full">
          <Container className="flex flex-col items-center gap-4 w-full h-full">
            <div className="flex w-fit items-center border m-4 border-gray-400 rounded-lg">
              <div className="flex items-center w-fit border-r pr-2 border-gray-400">
                <Input
                  type="text"
                  placeholder="Pesquise o nome da Atividade"
                  className="border-none w-full min-w-52 focus:!outline-none text-ellipsis"
                  onChange={(e) => setSearchQueryName(e.target.value)}
                />
                <SearchIcon className="text-gray-500 scale-75" />
              </div>
              <div className="flex items-center w-fit border-r pr-2 border-gray-400">
                <Input
                  type="text"
                  placeholder="Pesquise o nome do Evento"
                  className="border-none w-full min-w-48 focus:!outline-none text-ellipsis"
                  onChange={(e) => setSearchQueryEvent(e.target.value)}
                />
                <SearchIcon className="text-gray-500 scale-75" />
              </div>
              <Input
                type="date"
                placeholder="Data Inicial"
                className="border-0 rounded-none !border-r border-gray-400"
                onChange={(e) =>
                  setSearchQueryDateStart(new Date(e.target.value))
                }
              />
              <Input
                type="date"
                placeholder="Data Final"
                className="border-0 rounded-none !border-r border-gray-400"
                onChange={(e) =>
                  setSearchQueryDateEnd(new Date(e.target.value))
                }
              />
              <Select
                defaultValue="all"
                onValueChange={(value) => {
                  const isConfirmed: { [key: string]: boolean | null } = {
                    all: null,
                    yes: true,
                    no: false,
                  };

                  setSearchQueryPresence(isConfirmed[value]);
                }}
              >
                <SelectTrigger className="capitalize w-fit gap-2 border-0 border-r rounded-none border-gray-400">
                  <SelectValue placeholder="Selecione o tipo de presença" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="yes">Confirmada</SelectItem>
                  <SelectItem value="no">Não Confirmada</SelectItem>
                </SelectContent>
              </Select>
              <Select
                defaultValue="all"
                onValueChange={(value) => {
                  const activities: { [key: string]: ActivityTypes | null } = {
                    all: null,
                    ...Object.values(ActivityTypes).reduce(
                      (obj, type) => {
                        obj[type] = type;
                        return obj;
                      },
                      {} as { [key: string]: ActivityTypes | null }
                    ),
                  };

                  setSearchQueryType(activities[value]);
                }}
              >
                <SelectTrigger className="capitalize w-fit gap-2 border-0 border-r rounded-none border-gray-400">
                  <SelectValue placeholder="Selecione o tipo de Atividade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Object.values(ActivityTypes).map((type) => (
                    <SelectItem key={type} value={type} className="capitalize">
                      {type.toLocaleLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue="all"
                onValueChange={(value) => {
                  const shifts: { [key: string]: Shifts | null } = {
                    all: null,
                    ...Object.values(Shifts).reduce(
                      (obj, shift) => {
                        obj[shift] = shift;
                        return obj;
                      },
                      {} as { [key: string]: Shifts | null }
                    ),
                  };

                  setSearchQueryShift(shifts[value]);
                }}
              >
                <SelectTrigger className="capitalize w-fit gap-2 border-none">
                  <SelectValue placeholder="Selecione o turno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {Object.values(Shifts).map((shift) => (
                    <SelectItem
                      key={shift}
                      value={shift}
                      className="capitalize"
                    >
                      {shift.toLocaleLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              {activities &&
                activities
                  .filter((activity) => {
                    const activityDate = new Date(activity.data);

                    const nameCondition =
                      !searchQueryName ||
                      activity.nome.includes(searchQueryName);
                    const eventCondition =
                      !searchQueryEvent ||
                      activity.evento.includes(searchQueryEvent);
                    const typeCondition =
                      !searchQueryType ||
                      activity.tipo_atividade === searchQueryType;
                    const presenceCondition =
                      searchQueryPresence === null ||
                      activity.presenca === searchQueryPresence;

                    const dateStartCondition = !(
                      searchQueryDateStart &&
                      activityDate < searchQueryDateStart
                    );
                    const dateEndCondition = !(
                      searchQueryDateEnd && activityDate > searchQueryDateEnd
                    );

                    const shiftCondition =
                      !searchQueryShift || activity.turno === searchQueryShift;

                    return (
                      nameCondition &&
                      eventCondition &&
                      typeCondition &&
                      presenceCondition &&
                      dateStartCondition &&
                      dateEndCondition &&
                      shiftCondition
                    );
                  })
                  .map((activity) => (
                    <Card.Wrapper>
                      <Card.Body>
                        <Card.Title
                          className="capitalize"
                          title={`${activity.nome} - ${activity.turno.toLocaleLowerCase()}`}
                        />
                        <div className="flex gap-2 items-start justify-between">
                          <div className="flex flex-col gap-2">
                            <Card.Description
                              className="capitalize"
                              description={`Evento: ${activity.evento}`}
                            />
                            <Card.Description
                              className="capitalize"
                              description={`Tipo: ${activity.tipo_atividade}`}
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Card.Description
                              className="capitalize"
                              description={`Data: ${activity.data ?? 'Sem data'}`}
                            />
                            <Card.Description
                              className="capitalize"
                              description={`Presença: ${activity.presenca ? 'Confirmada' : 'Não confirmada'}`}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col mt-2">
                          <Card.Description
                            className="mt-2"
                            description={`${activity.descricao}`}
                          />
                        </div>
                      </Card.Body>
                    </Card.Wrapper>
                  ))}
            </div>
          </Container>
        </Main>
      </div>
    </>
  );
}
