import { BrickCardMp } from '@/components/shared/BrickMP';
import { Container } from '@/components/shared/Container';
import { Header } from '@/components/shared/Header';
import { useEventBatchs } from '@/hooks/useEventBatchs';
import { useUserRegistrationInEvent } from '@/hooks/useEventInscription';
import { useEvents } from '@/hooks/useEvents';
import { api } from '@/lib/api';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function Event() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const { data: batchs } = useEventBatchs(findEvent?.uuid_evento || '');
  const { data, isFetching } = useUserRegistrationInEvent(
    findEvent?.uuid_evento
  );

  const [selectedBatch, setSelectedBatch] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const handleSubscribeInEvent = async () => {
    if (!token) {
      return navigate('/sign-in');
    }
    if (!selectedBatch) {
      return toast.error('Selecione um lote!');
    }

    setIsSubmitting(true);
    try {
      await api.post(`/lote/${selectedBatch}/register`, undefined, {
        headers: { Authorization: `Bearer ${token}` },
      });
      window.location.reload();
    } catch (error) {
      toast.error('Erro ao se inscrever no evento!');
    } finally {
      setIsSubmitting(false);
    }
  };

  function BatchButtons() {
    return (
      <>
        {batchs?.map((item) => (
          <button
            key={item.uuid_lote}
            onClick={() => setSelectedBatch(item.uuid_lote || '')}
            className={`rounded-md shadow-md border sm:w-auto w-full bg-slate-100 p-4 flex flex-col gap-1 ${
              selectedBatch === item.uuid_lote
                ? 'border-purple-500'
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
      <div className="rounded-md border-2 bg-white p-8 shadow-md w-full gap-4 flex flex-col items-center justify-center">
        <div className="flex gap-2 flex-wrap w-full">
          <BatchButtons />
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="pix"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === 'pix'}
            />{' '}
            PIX
          </label>
          <label>
            <input
              type="radio"
              value="card"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked={paymentMethod === 'card'}
            />{' '}
            Cartão
          </label>
        </div>

        {paymentMethod === 'pix' ? (
          <button
            disabled={isSubmitting}
            onClick={handleSubscribeInEvent}
            className="rounded-md px-3 py-2 font-semibold text-white text-center bg-purple-500 text-lg hover:bg-purple-700 disabled:bg-purple-900"
          >
            Inscreve-se
          </button>
        ) : (
          <BrickCardMp />
        )}
      </div>
    );
  }
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

          {isFetching ? (
            <div>Carregando...</div>
          ) : (
            <>
              {new Date() >= new Date(findEvent?.date || '') ? (
                <div className="w-full px-8 rounded-md border-2 bg-white justify-center p-8 shadow-md flex-col gap-4 sm:gap-16 sm:flex-row">
                  <h1 className="text-center text-2xl font-semibold">
                    Inscrições <span className="text-red-500">ENCERRADAS</span>!
                  </h1>
                </div>
              ) : token ? (
                <>
                  {!data.isSubscribed ? (
                    <InscriptionSection />
                  ) : (
                    <div>
                      <Link to={`/pagamentos/${slug}`}>Ver comprovante</Link>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/sign-in">Faça o login</Link>
              )}
            </>
          )}
        </main>
      </Container>
    </>
  );
}
