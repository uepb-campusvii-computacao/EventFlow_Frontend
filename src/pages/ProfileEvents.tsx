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
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export function ProfileEvents() {
  const token = Cookies.get('token');

  const [events, setEvents] = useState<
    | {
        id: string;
        slug: string;
        nome: string;
        data: string | null;
        ativo: boolean;
        banner: string;
      }[]
    | null
  >(null);
  const [searchQueryName, setSearchQueryName] = useState('');
  const [searchQueryActive, setSearchQueryActive] = useState<boolean | null>(
    null
  );
  const [searchQueryStartDate, setSearchQueryStartDate] = useState<Date | null>(
    null
  );
  const [searchQueryEndDate, setSearchQueryEndDate] = useState<Date | null>(
    null
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/user/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;
        setEvents(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-4rem-1px)]">
        <SideBar.Main items={profileLinks} />
        <Main className="w-full">
          <Container className="flex flex-col gap-4">
            <div className="flex relative items-center">
              <Input
                type="text"
                placeholder="Pesquise o nome do evento"
                onChange={(e) =>
                  setSearchQueryName(e.target.value.toLowerCase())
                }
                className="focus:!ring-purple-500"
              />
              <Input
                type="date"
                placeholder="Data Inicial"
                onChange={(e) =>
                  setSearchQueryStartDate(new Date(e.target.value))
                }
                className="focus:!ring-purple-500"
              />
              <Input
                type="date"
                placeholder="Data Final"
                onChange={(e) =>
                  setSearchQueryEndDate(new Date(e.target.value))
                }
                className="focus:!ring-purple-500"
              />
              <Select
                defaultValue="all"
                onValueChange={(value) => {
                  const active: { [key: string]: boolean | null } = {
                    all: null,
                    active: true,
                    inactive: false,
                  };

                  setSearchQueryActive(active[value]);
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecione o Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {events &&
              events
                .filter((event) => {
                  if (
                    !searchQueryName &&
                    searchQueryActive == null &&
                    !searchQueryStartDate &&
                    !searchQueryEndDate
                  ) {
                    return true;
                  }

                  const hasMatchingName = event.nome
                    .toLowerCase()
                    .includes(searchQueryName);

                  const hasMatchingStatus =
                    searchQueryActive === null ||
                    event.ativo === searchQueryActive;

                  const hasValidStartDate =
                    !searchQueryStartDate ||
                    !event.data ||
                    new Date(event.data) >= searchQueryStartDate;

                  const hasValidEndDate =
                    !searchQueryEndDate ||
                    !event.data ||
                    new Date(event.data) <= searchQueryEndDate;

                  return (
                    hasMatchingName &&
                    hasMatchingStatus &&
                    hasValidStartDate &&
                    hasValidEndDate
                  );
                })
                .map((data) => {
                  return (
                    <Card.Wrapper key={data.id}>
                      <Card.Link to={`/perfil/eventos/${data.slug}`}>
                        <Card.Image src={data.banner} alt={data.nome} />
                        <Card.Body className="flex flex-row justify-between items-start gap-4">
                          <div className="flex flex-col">
                            <Card.Title title={data.nome} />
                            <Card.Description
                              description={
                                data.data ? data.data : 'Sem data definida'
                              }
                            />
                          </div>
                          <div
                            className="rounded-2xl opacity-90 data-[active=true]:bg-green-300 data-[active=true]:text-green-600 font-bold text-center p-2"
                            data-active={data.ativo}
                          >
                            <p>{data.ativo ? 'Ativo' : 'Terminou'}</p>
                          </div>
                        </Card.Body>
                      </Card.Link>
                    </Card.Wrapper>
                  );
                })}
          </Container>
        </Main>
      </div>
    </>
  );
}
