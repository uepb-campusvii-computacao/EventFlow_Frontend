
import { Container } from '@/shared/components/Container';
import { Header } from '@/shared/components/Header';
import { Button } from '@/shared/components/ui/button';
import { useActivities } from '@/activities/hooks/useActivity';
import { useEventBatchs } from '@/batches/hooks/useEventBatchs';
import { useUserRegistrationInEvent } from '@/user/hooks/useEventInscription';
import { useEvents } from '@/events/hooks/useEvents';
import { api } from '@/lib/api';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PaymentStatus } from '@/payments/domain/paymentEntity';
import { activityDetails } from '@/activities/domain/activityEntity';
import { InscriptionSection } from '../components/inscriptionSection';

export function Event() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const { data: activities } = useActivities(findEvent?.uuid_evento || '');
  const { data: batchs } = useEventBatchs(findEvent?.uuid_evento || '');
  const { data, isFetching } = useUserRegistrationInEvent(
    findEvent?.uuid_evento
  );

  const statusPagamento = PaymentStatus;

  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedBatchValue, setSelectedBatchValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  console.log(selectedActivities);
  const navigate = useNavigate();

  const tokenEvent = Cookies.get('tokenEvent');
  const token = Cookies.get('token');

  const handleSubscribeInEvent = async () => {
    if (!token) {
      return navigate('/sign-in');
    }
    if (!selectedBatch) {
      return toast.error('Selecione um lote!');
    }
    setIsSubmitting(true);

    let payload: {
      atividades?: string[];
    } = selectedActivities.length > 0 ? { atividades: selectedActivities } : {};
    try {
      await api.post(`/lote/${selectedBatch}/register`, payload);
      toast.success('Inscrição realizada com sucesso!');
      navigate(`/pagamentos/${slug}`);
    } catch (error) {
      toast.error('Erro ao se inscrever no evento!');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate('/sign-in');
    }
    if (findEvent?.isPrivate && !tokenEvent) {
      toast.error('Você não tem permissão para acessar este evento');
      return navigate('/');
    }
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: findEvent?.background_img_url
            ? `url(${findEvent?.background_img_url})`
            : '#ffffff',
        }}
        className="pt-8 shadow-xl "
      >
        <Container className="rounded-xl bg-white">
          <main className="flex min-h-dvh w-full flex-col items-center gap-4 pb-16 pt-8">
            <div>
              <img
                className="w-full h-auto p-10"
                src={findEvent?.banner_img_url}
                alt="Banner do evento"
                width={160}
              />

              {findEvent?.conteudo && (
                <div className="bg-white p-12 w-full text-justify">
                  <div
                    className="w-full prose-sm"
                    dangerouslySetInnerHTML={{ __html: findEvent?.conteudo }}
                  ></div>
                </div>
              )}

              {isFetching ? (
                <div className="text-center">Carregando...</div>
              ) : (
                <>
                  {new Date() >= new Date(findEvent?.date || '') ? (
                    <div className="w-full px-8 bg-white justify-center p-8 flex-col gap-4 sm:gap-16 sm:flex-row">
                      <h1 className="text-center text-2xl font-semibold">
                        Inscrições{' '}
                        <span className="text-vlue-500">ENCERRADAS</span>!
                      </h1>
                    </div>
                  ) : token != '' ? (
                    <div className="flex flex-row gap-2">
                      {!data?.isSubscribed ? (
                        <InscriptionSection
                          batchs={batchs}
                          selectedBatch={selectedBatch}
                          setSelectedBatch={setSelectedBatch}
                          setSelectedBatchValue={setSelectedBatchValue}
                          paymentMethod={paymentMethod}
                          activities={activities}
                          activityDetails={activityDetails}
                          selectedActivities={selectedActivities}
                          setSelectedActivities={setSelectedActivities}
                          selectedBatchValue={selectedBatchValue}
                          setPaymentMethod={setPaymentMethod}
                          isSubmitting={isSubmitting}
                          handleSubscribeInEvent={handleSubscribeInEvent}
                        />
                      ) : (
                        <div className="flex w-full items-center justify-center">
                          <Button
                            className="data-[status=PENDENTE]:bg-yellow-500 data-[status=REALIZADO]:bg-green-600 data-[status=CANCELADO]:bg-red-600 data-[status=REJEITADO]:bg-blue-600"
                            data-status={data.status_pagamento}
                          >
                            <Link
                              to={
                                data.status_pagamento != 'GRATUITO'
                                  ? `/pagamentos/${slug}`
                                  : ''
                              }
                              className=""
                            >
                              {
                                statusPagamento[
                                  data.status_pagamento as keyof typeof PaymentStatus
                                ]
                              }
                            </Link>
                          </Button>
                        </div>
                      )}
                      {data.status_pagamento != 'REALIZADO' &&
                      data.status_pagamento != 'GRATUITO' &&
                      data.status_pagamento ? (
                        <div className="flex w-full items-center justify-center">
                          <Button>
                            <Link
                              to={`/pagamentos/${slug}/atualizar`}
                              className=""
                            >
                              Alterar Pagamento
                            </Link>
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <Link to="/sign-in" className="justify-center">
                      Faça o login
                    </Link>
                  )}
                </>
              )}
            </div>
          </main>
        </Container>
      </div>
    </>
  );
}
