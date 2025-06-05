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
import { useEvents } from '@/hooks/useEvents';
import { profileLinks } from '@/lib/links';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

export function ProfileEvents() {
  const { eventsQueryByUser } = useEvents();

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

  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-4rem-1px)]">
        <SideBar.Main items={profileLinks} />
        <Main className="w-full">
          <Container className="flex flex-col gap-4">
            <div className="flex w-fit items-center border m-4 border-gray-400 rounded-lg ">
              <div className="flex items-center w-fit border-r pr-2 border-gray-400">
                <Input
                  type="text"
                  placeholder="Pesquise o nome do evento"
                  onChange={(e) =>
                    setSearchQueryName(e.target.value.toLowerCase())
                  }
                  className="border-none w-full min-w-48 focus:!outline-none text-ellipsis"
                />
                <SearchIcon className="text-gray-500 scale-75" />
              </div>
              <Input
                type="date"
                placeholder="Data Inicial"
                onChange={(e) =>
                  setSearchQueryStartDate(new Date(e.target.value))
                }
                className="border-0 rounded-none !border-r border-gray-400"
              />
              <Input
                type="date"
                placeholder="Data Final"
                onChange={(e) =>
                  setSearchQueryEndDate(new Date(e.target.value))
                }
                className="border-0 rounded-none !border-r border-gray-400"
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
                <SelectTrigger className="border-none">
                  <SelectValue placeholder="Selecione o Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {eventsQueryByUser.data &&
              eventsQueryByUser.data
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
                    <Card.Wrapper
                      key={data.id}
                      className="border border-gray-800 rounded-xl"
                    >
                      <Card.Link to={`/perfil/eventos/${data.slug}`}>
                        <Card.Image src={data.banner} alt={data.nome} />
                        <Card.Body className="flex flex-row justify-between items-start gap-4">
                          <div className="flex flex-col">
                            <Card.Title
                              className="capitalize"
                              title={data.nome}
                            />
                            <Card.Description
                              className="text-sm text-gray-500"
                              description={
                                data.data ? data.data : 'Sem data definida'
                              }
                            />
                          </div>
                          <div
                            className="rounded-2xl opacity-90 data-[active=true]:bg-green-500 font-bold text-center p-2 px-4 data-[active=false]:bg-red-500 text-gray-100 h-fit"
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
