import { Card } from '@/components/shared/Card/Root';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Main } from '@/components/shared/Main';
import { SideBar } from '@/components/shared/SideBar/Root';
import { api } from '@/lib/api';
import { profileLinks } from '@/lib/links';
import Cookies from 'js-cookie';
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
          <Container className="flex flex-col gap-4">
            {activities?.map((activity) => (
              <Card.Wrapper>
                <Card.Body>
                  <Card.Title
                    title={`${activity.nome} - ${activity.turno.toLocaleLowerCase()}`}
                  />
                  <div className="flex gap-2 items-start justify-between">
                    <div className="flex flex-col gap-2">
                      <Card.Description
                        description={`Evento: ${activity.evento}`}
                      />
                      <Card.Description
                        description={`Tipo: ${activity.tipo_atividade}`}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Card.Description
                        description={`Data: ${activity.data ?? 'Sem data'}`}
                      />
                      <Card.Description
                        description={`Presença: ${activity.presenca ? 'Confirmada' : 'Não confirmada'}`}
                      />
                    </div>
                  </div>
                  <Card.Description description={`${activity.descricao}`} />
                </Card.Body>
              </Card.Wrapper>
            ))}
          </Container>
        </Main>
      </div>
    </>
  );
}
