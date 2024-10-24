import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { useEventBatchs } from '@/hooks/useEventBatchs';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function Event() {
  const { slug } = useParams();
  const { findEvent, eventsQueryByUser } = useEvents(slug);
  const { data: batchs } = useEventBatchs(findEvent?.uuid_evento || '');
  const subscribed =
    eventsQueryByUser.data &&
    eventsQueryByUser.data.some(
      (evento) => evento.uuid_evento === findEvent?.uuid_evento
    );

  const [selectedBatch, setSelectedBatch] = useState<string>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubscribeInEvent() {
    setIsSubmitting(true);
    try {
      await api.post(`/lote/${selectedBatch}/register`);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-dvh w-full flex-col items-end gap-4 pb-16 pt-8">
          <img
            className="sm:h-[388px] w-full h-[180px] rounded-md border-2 shadow-md bg-"
            src={findEvent?.banner_img_url}
            width={160}
          />
          {findEvent?.conteudo && (
            <div className="rounded-md border-2 bg-white p-8 shadow-md">
              <div
                style={{ all: 'unset' }}
                dangerouslySetInnerHTML={{ __html: findEvent?.conteudo }}
              ></div>
            </div>
          )}

          {new Date() >= new Date(findEvent?.date || '') && !subscribed ? (
            <div className="w-full px-8 rounded-md border-2 bg-white justify-center p-8 shadow-md flex-col gap-4 sm:gap-16 sm:flex-row">
              <h1 className="text-center text-2xl font-semibold">
                Inscrições <span className="text-red-500">ENCERRADAS</span>!
              </h1>
            </div>
          ) : (
            <>
              {batchs && (
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
                  <button
                    disabled={isSubmitting}
                    onClick={handleSubscribeInEvent}
                    className="rounded-md px-3 py-2 font-semibold text-white text-center bg-purple-500 text-lg hover:bg-purple-700 disabled:bg-purple-900"
                  >
                    Increve-se
                  </button>
                </div>
              )}
            </>
          )}

          {subscribed && (
            <div className="w-full px-8 rounded-md border-2 bg-white justify-center p-8 shadow-md flex-col gap-4 sm:gap-16 sm:flex-row">
              <h1 className="text-center text-2xl font-semibold">
                Status: <span className="text-green-500">Inscrito</span>!
              </h1>
            </div>
          )}

          {/* <Link to={`/eventos/${slug}/inscricao`} className="button-primary">
            Inscreva-se
          </Link> */}
        </main>
      </Container>
    </>
  );
}
