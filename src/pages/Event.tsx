import { Container } from '@/components/shared/Container';
import { EditActivities } from '@/components/shared/forms/EditActivities';
import { Header } from '@/components/shared/Header';
import { useEventBatchs } from '@/hooks/useEventBatchs';
import { useUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import { api, checkError } from '@/lib/api';
import { useEffect, useMemo, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

interface Activity {
  uuid_atividade: string;
  nome: string;
  max_participants: number;
  tipo_atividade: string;
  _count: number;
}

interface ActivitiesByType {
  [type: string]: Activity[];
}

export function Event() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const { data: batchs } = useEventBatchs(findEvent?.uuid_evento || '');
  const { data: subscribed } = useUserRegistrationInEvent(
    findEvent?.uuid_evento
  );

  const [selectedBatch, setSelectedBatch] = useState<string>();
  const [minhasAtividades, setMinhasAtividades] = useState<ActivitiesByType>(
    {}
  );
  const [atividades, setAtividades] = useState<ActivitiesByType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<{
    atividades: { atividade_id: string }[];
  }>({ atividades: [] });

  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const handleSelectionChange = (selected: { [key: string]: string }) => {
    const atividades = Object.values(selected).map((atividade_id) => ({
      atividade_id,
    }));
    setSelectedActivities({ atividades });
  };

  const handleSubscribeInEvent = async () => {
    if (!token) {
      navigate('/sign-in');
      return;
    }

    if (!selectedBatch) {
      toast.error('Selecione um lote!');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post(`/lote/${selectedBatch}/register`, selectedActivities, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMyActivities();
      window.location.reload();
    } catch (error) {
      checkError(
        error,
        (message) => toast.error(message),
        () => toast.error('Ocorreu um erro inesperado.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchMyActivities = async () => {
    if (!token) return;

    try {
      const response = await api.get(
        `/user/events/${findEvent?.uuid_evento}/my-activities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMinhasAtividades(response.data);
    } catch (error) {
      checkError(
        error,
        (message) => toast.error(message),
        () =>
          toast.error(
            'Erro ao buscar atividades: ' + error || 'Ocorreu um erro.'
          )
      );
    }
  };

  const fetchActivitiesInEvent = async () => {
    try {
      const response = await api.get(
        `/events/${findEvent?.uuid_evento}/atividades`
      );
      setAtividades(response.data);
    } catch (error) {
      checkError(
        error,
        (message) => toast.error(message),
        () =>
          toast.error(
            'Erro ao buscar atividades: ' + error || 'Ocorreu um erro.'
          )
      );
    }
  };

  useEffect(() => {
    if (findEvent?.uuid_evento) {
      fetchMyActivities();
      fetchActivitiesInEvent();
    }
  }, [findEvent?.uuid_evento]);

  const activityEntries = useMemo(
    () => Object.entries(minhasAtividades),
    [minhasAtividades]
  );

  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-dvh w-full flex-col items-center gap-4 pb-16 pt-8">
          <img
            className="w-full h-auto rounded-md border-2 shadow-md"
            src={findEvent?.banner_img_url}
            alt="Banner do evento"
            width={160}
          />
          
          {findEvent?.conteudo && (
            <div className="rounded-md border-2 bg-white p-8 shadow-md w-full">
              <div
                className="w-full prose-sm"
                dangerouslySetInnerHTML={{ __html: findEvent?.conteudo }}
              ></div>
            </div>
          )}

          {new Date() >= new Date(findEvent?.date || '') ? (
            <div className="w-full px-8 rounded-md border-2 bg-white justify-center p-8 shadow-md flex-col gap-4 sm:gap-16 sm:flex-row">
              <h1 className="text-center text-2xl font-semibold">
                Inscrições <span className="text-red-500">ENCERRADAS</span>!
              </h1>
            </div>
          ) : !subscribed ? (
            batchs && (
              <div className="rounded-md border-2 bg-white p-8 shadow-md w-full gap-4 flex flex-col items-center justify-center">
                <div className="flex gap-2 flex-wrap w-full">
                  {batchs.map((item) => (
                    <button
                      key={item.uuid_lote}
                      onClick={() => setSelectedBatch(item.uuid_lote || '')}
                      className={`rounded-md shadow-md border sm:w-auto w-full bg-slate-100 p-4 flex flex-col gap-1 ${selectedBatch === item.uuid_lote ? 'border-purple-500' : 'border-accent'}`}
                    >
                      <h2 className="font-semibold text-lg">{item.nome}</h2>
                      <span className="font-light">{item.descricao}</span>
                      <span className="font-semibold">
                        R$ {item.preco.toFixed(2).replace('.', ',')}
                      </span>
                    </button>
                  ))}
                </div>
                <EditActivities
                  data={atividades ?? {}}
                  onSelect={handleSelectionChange}
                />
                <button
                  disabled={isSubmitting}
                  onClick={handleSubscribeInEvent}
                  className="rounded-md px-3 py-2 font-semibold text-white text-center bg-purple-500 text-lg hover:bg-purple-700 disabled:bg-purple-900"
                >
                  {token ? 'Inscreva-se' : 'Fazer login'}
                </button>
              </div>
            )
          ) : (
            <div className="w-full px-8 rounded-md border-2 bg-white justify-center p-8 shadow-md flex-col gap-4 sm:gap-16 sm:flex-row">
              <h1 className="text-center text-2xl font-semibold">
                Status: <span className="text-green-500">Inscrito</span>!
              </h1>

              {activityEntries.map(([type, activities]) => (
                <div key={type} className="bg-gray-100 py-6 w-full">
                  <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </h2>
                  <div className="grid gap-4 max-w-4xl mx-auto">
                    {activities.map((activity) => (
                      <div
                        key={activity.uuid_atividade}
                        className="bg-white shadow-md rounded-lg p-4 max-w-md mx-auto"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {activity.nome}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tipo: {activity.tipo_atividade}
                        </p>
                        <p className="text-sm text-gray-600">
                          Participantes: {activity._count} /{' '}
                          {activity.max_participants}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </Container>
    </>
  );
}
