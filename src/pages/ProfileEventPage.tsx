import { StatusBrickMp } from '@/components/shared/BrickMP';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Main } from '@/components/shared/Main';
import { SideBar } from '@/components/shared/SideBar/Root';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useActivities } from '@/hooks/useActivity';
import { useUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import { profileLinks } from '@/lib/links';
import { Activities, ActivityTypes } from '@/types';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function ProfileEventPage() {
  const token = Cookies.get('token');

  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const {
    data: activities,
    isFetching: isFetchingActivities,
    refetch: refetchActivities,
    isRefetching: isRefetchingActivities,
  } = useActivities(findEvent?.uuid_evento || '');
  const { data: userData, isFetching: isFetchingUserData } =
    useUserRegistrationInEvent(findEvent?.uuid_evento);

  const [userActivities, setUserActivities] = useState<
    | {
        id: string;
        tipo: string;
        turno: string;
      }[]
    | null
  >(null);
  const [selectedActivities, setSelectedActivities] = useState<
    { id: string; turno: string; tipo: string }[] | []
  >([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get('/user/activities', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            evento: findEvent?.nome,
          },
        });
        const data = await response.data;
        setUserActivities(
          data.map(
            (activity: {
              id: string;
              tipo_atividade: string;
              turno: string;
            }) => ({
              id: activity.id,
              tipo: activity.tipo_atividade,
              turno: activity.turno,
            })
          )
        );
        setSelectedActivities(
          data.map(
            (activity: {
              id: string;
              tipo_atividade: string;
              turno: string;
            }) => ({
              id: activity.id,
              tipo: activity.tipo_atividade,
              turno: activity.turno,
            })
          )
        );
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchActivities();
  }, []);

  const activityTypes: {
    key: keyof Activities;
    label: string;
    color: string;
  }[] = [
    { key: ActivityTypes.MINICURSO, label: 'Minicursos', color: 'blue' },
    { key: ActivityTypes.OFICINA, label: 'Oficinas', color: 'green' },
    { key: ActivityTypes.WORKSHOP, label: 'Workshops', color: 'purple' },
    { key: ActivityTypes.PALESTRA, label: 'Palestras', color: 'orange' },
  ];

  const handleActivityUpdate = async () => {
    try {
      const response = await api.put(
        `/user/${userData?.uuid_user}/atividades`,
        {
          atividadesAntigas: userActivities,
          atividadesNovas: selectedActivities,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Atividades atualizadas com sucesso!');
        setUserActivities(selectedActivities);
        refetchActivities();
      }
      console.log(response.data);
    } catch (error) {
      toast.error('Erro ao atualizar atividades selecionadas');
    }
  };

  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-4rem-1px)]">
        <SideBar.Main items={profileLinks} />
        <Main className="w-full">
          <Container className="flex flex-col gap-4 w-full h-full items-center xl:p-4">
            <h1 className="text-2xl capitalize font-bold">{findEvent?.nome}</h1>
            <section className="flex flex-col items-center rounded-md border-2 border-gray-200 bg-white p-4 shadow-md w-full">
              <h1 className="text-center text-xl font-bold">
                Informações do Evento
              </h1>
              <div className="mt-4 space-y-2 text-left w-full">
                {findEvent && (
                  <>
                    <p>
                      <strong>Nome:</strong> {findEvent.nome}
                    </p>
                    <p>
                      <strong>Data do Evento: </strong>
                      {findEvent.date
                        ? new Date(findEvent.date).toLocaleDateString('pt-BR')
                        : 'Sem data marcada'}
                    </p>
                  </>
                )}
                {isFetchingUserData ? (
                  <p>Loading...</p>
                ) : (
                  userData && (
                    <>
                      <p>
                        <strong>Data de Inscrição: </strong>
                        {userData.created_at
                          ? new Date(userData.created_at).toLocaleDateString(
                              'pt-BR'
                            )
                          : 'Data não disponível'}
                      </p>
                      <p>
                        <strong>Status da Inscrição: </strong>
                        {userData.isSubscribed ? 'Inscrito' : 'Não Inscrito'}
                      </p>
                      <p>
                        <strong>Presença: </strong>
                        {userData.credenciamento
                          ? 'Confirmada'
                          : 'Não Confirmada'}
                      </p>
                    </>
                  )
                )}
              </div>
            </section>
            <section className="flex flex-col items-center rounded-md border-2 border-gray-200 bg-white p-4 shadow-md w-full">
              <h1 className="text-center text-xl font-bold">
                Informações de pagamento
              </h1>
              <div className="flex justify-between mt-4 space-y-2 text-left w-full">
                {isFetchingUserData ? (
                  <p>Loading...</p>
                ) : (
                  userData && (
                    <div className="flex flex-col items-start">
                      <p>
                        <strong>Lote de Inscrição: </strong>
                        <span className="capitalize">
                          {userData.lote.nome || 'Lote não especificado'}
                        </span>
                      </p>
                      <p>
                        <strong>Valor Pago: </strong>
                        {userData.lote.preco && userData.lote.preco > 0
                          ? `R$ ${userData.lote.preco.toFixed(2)}`
                          : 'Gratuito'}
                      </p>
                      <p>
                        <strong>Método de Pagamento: </strong>
                        {userData.lote && userData.lote.preco > 0
                          ? userData.payment_method
                            ? 'Cartão de crédito'
                            : 'Pix'
                          : 'Gratuito'}
                      </p>
                      <p>
                        <strong>Status do Pagamento: </strong>
                        <span className="capitalize">
                          {userData.status_pagamento.toLocaleLowerCase()}
                        </span>
                      </p>
                      <p>
                        <strong>Data de Pagamento: </strong>
                        {userData.updated_at
                          ? new Date(userData.updated_at).toLocaleDateString(
                              'pt-BR',
                              {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                              }
                            )
                          : 'Data não disponível'}
                      </p>
                    </div>
                  )
                )}
              </div>
              {isFetchingUserData ? (
                <p>Loading...</p>
              ) : (
                userData.lote &&
                userData.lote.preco > 0 && (
                  <div>
                    <StatusBrickMp
                      paymentId={userData.id_payment_mercado_pago}
                    />
                  </div>
                )
              )}
            </section>
            <section className="flex flex-col items-center rounded-md border-2 border-gray-200 bg-white p-4 shadow-md w-full">
              {isFetchingActivities && !isRefetchingActivities ? (
                <p>Loading activities...</p>
              ) : (
                activities && (
                  <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
                    <h1 className="text-center text-xl font-bold">
                      Atividades
                    </h1>
                    {activityTypes.map(({ key, label, color }) => {
                      const activitiesPerType = activities[key];
                      const turnos = activitiesPerType
                        ? Object.entries(activitiesPerType)
                        : [];

                      if (turnos.length === 0) return null;

                      return (
                        <div key={key} className="w-full max-w-3xl space-y-6">
                          <h2
                            className={`text-2xl font-semibold text-${color}-600`}
                          >
                            {label}
                          </h2>

                          {turnos.map(([turno, lista]) => {
                            const handleChange = (selected: string) => {
                              if (selected === 'none') {
                                const otherIdsSameTurno =
                                  turnos
                                    .find(([t]) => t === turno)?.[1]
                                    .map((a) => a.uuid_atividade) || [];

                                const updated = selectedActivities.filter(
                                  ({ id }) => !otherIdsSameTurno.includes(id)
                                );
                                setSelectedActivities(updated);
                                return;
                              }

                              const activity = lista.find(
                                (a) => a.uuid_atividade === selected
                              );

                              const updated = [
                                ...selectedActivities,
                                {
                                  id: activity?.uuid_atividade || '',
                                  turno,
                                  tipo: key,
                                },
                              ];
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
                                  defaultValue={
                                    lista.find((a) =>
                                      userActivities?.some(
                                        (ua) => ua.id === a.uuid_atividade
                                      )
                                    )?.uuid_atividade || 'none'
                                  }
                                  onValueChange={(selected) => {
                                    handleChange(selected);
                                  }}
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
                                    {lista.map((a) => (
                                      <SelectItem
                                        className="text-slate-900 hover:bg-slate-200"
                                        key={a.uuid_atividade}
                                        value={a.uuid_atividade}
                                      >
                                        {`${a.nome} [${a._count}/${a.max_participants}]`}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    <button
                      onClick={handleActivityUpdate}
                      className="mt-4 p-2 bg-blue-500 text-white rounded"
                    >
                      Click Me
                    </button>
                  </div>
                )
              )}
            </section>
          </Container>
        </Main>
      </div>
    </>
  );
}
