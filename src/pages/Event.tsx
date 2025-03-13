import { BrickCardMp } from '@/components/shared/BrickMP';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { useEventBatchs } from '@/hooks/useEventBatchs';
import { useUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import {
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from '@mercadopago/sdk-react/esm/bricks/cardPayment/type';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function Event() {
  
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const { data: batchs } = useEventBatchs(findEvent?.uuid_evento || '');
  const { data, isFetching} = useUserRegistrationInEvent(
    findEvent?.uuid_evento
  );


  enum PaymentStatus {
    PENDENTE = 'PAGAMENTO PENDENTE',
    REALIZADO = 'VER COMPROVANTE',
    CANCELADO = 'INSCRIÇÃO CANCELADA',
    EXPIRADO = 'PAGAMENTO EXPIRADO',
  }

  const statusPagamento = PaymentStatus;

  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [selectedBatchValue, setSelectedBatchValue] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState <string>('');
  const [isSubmitting, setIsSubmitting] = useState <boolean>(false);

  
  const navigate = useNavigate();

  const [cookies] = useCookies(['token','tokenEvent']);
  const tokenEvent = cookies.tokenEvent;
  const token = cookies.token;



  const handleSubscribeInEvent = async (
    paymentData?: ICardPaymentFormData<ICardPaymentBrickPayer>
  ) => {
    if (!token) {
      return navigate('/sign-in');
    }
    if (!selectedBatch) {
      return toast.error('Selecione um lote!');
    }
    setIsSubmitting(true);

    let payload: {
      paymentData?: ICardPaymentFormData<ICardPaymentBrickPayer>;
      atividades?: string[];
    } = paymentData ? { paymentData: paymentData } : {};
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
    if(!token){
      return navigate('/sign-in')
    }
    if(findEvent?.isPrivate && !tokenEvent){
      return navigate('/')
    }
  }, []);

  function BatchButtons() {
    return (
      <>
        {batchs?.map((item) => (
          <button
            key={item.uuid_lote}
            onClick={() => {
              setSelectedBatch(item.uuid_lote || '');
              setSelectedBatchValue(item.preco);
            }}
            className={`rounded-md shadow-md border sm:w-auto w-full bg-slate-100 p-4 flex flex-col gap-1 ${
              selectedBatch === item.uuid_lote
                ? 'border-red-500'
                : 'border-accent'
            }`}
          >
            <h2 className="font-semibold text-lg">{item.nome}</h2>
            <span className="font-light">{item.descricao}</span>
            <span className="font-semibold">
              R$ {item.preco.toFixed(2).replace('.', ',')}
            </span>
          </button>
        ))}
      </>
    );
  }
  

  function InscriptionSection() {
    return (
      <div className="rounded-md bg-white p-8 w-full gap-4 flex flex-col  items-center justify-center">
        <div className="flex gap-2 flex-wrap w-full">
          <BatchButtons />
        </div>

        {selectedBatchValue > 0 ? (
          <div className="grid grid-cols-2 gap-5 ">
            <Toggle
              onClick={() => setPaymentMethod('pix')}
              className={`border-[1px] border-black px-4 py-2 transition-all duration-300 ${
                paymentMethod === 'pix'
                  ? 'border-red-600 shadow-lg shadow-red-600'
                  : ''
              }`}
            >
              Pix
            </Toggle>
            <Toggle
              onClick={() => setPaymentMethod('card')}
              className={`border-[1px] border-black px-4 py-2 transition-all duration-300 ${
                paymentMethod === 'card'
                  ? 'border-red-600 shadow-lg shadow-red-600'
                  : ''
              }`}
            >
              Cartão
            </Toggle>
          </div>
        ) : null}

        {paymentMethod === 'pix' ? (
            <button
              disabled={isSubmitting}
              onClick={() => { handleSubscribeInEvent()
              }
            }
              className="rounded-md px-3 py-2 font-semibold text-white text-center bg-red-500 text-lg hover:bg-red-700 disabled:bg-red-900"
            >
              Inscrever-se
            </button>
          ) : null
        }
        {paymentMethod === 'card' ? (
            (<BrickCardMp amount={selectedBatchValue} loteId={selectedBatch} />)
          ) : null
        }
      </div>
    );
  }

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
                <div>Carregando...</div>
              ) : (
                <>
                  {new Date() >= new Date(findEvent?.date || '') ? (
                    <div className="w-full px-8 bg-white justify-center p-8 flex-col gap-4 sm:gap-16 sm:flex-row">
                      <h1 className="text-center text-2xl font-semibold">
                        Inscrições{' '}
                        <span className="text-red-500">ENCERRADAS</span>!
                      </h1>
                    </div>
                  ) : token != '' ? (
                    <>
                      {!data?.isSubscribed ? (
                        <InscriptionSection />
                      ) : (
                        <div className='flex w-full items-center justify-center'>
                          <Button
                            className="data-[status=PENDENTE]:bg-yellow-300 data-[status=REALIZADO]:bg-green-600 data-[status=CANCELADO]:bg-red-300"
                            data-status={data.status_pagamento}
                          >
                            <Link to={`/pagamentos/${slug}`} className=''>
                              {
                                statusPagamento[
                                  data.status_pagamento as keyof typeof PaymentStatus
                                ]
                              }
                            </Link>
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link to="/sign-in" className='justify-center'>Faça o login</Link>
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
