import { Card } from '@/components/shared/Card/Root';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Main } from '@/components/shared/Main';
import { SideBar } from '@/components/shared/SideBar/Root';
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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/user/events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;
        console.log(data);
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
            {events?.map((data) => {
              return (
                <Card.Wrapper key={data.id}>
                  <Card.Link to={`/profile/events/${data.slug}`}>
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
