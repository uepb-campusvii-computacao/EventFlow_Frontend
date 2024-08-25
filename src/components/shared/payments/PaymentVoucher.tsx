import { usePaymentInformation } from '@/hooks/usePaymentInformation';
import { useParams } from 'react-router-dom';

export function PaymentVoucher() {
  const { batch_id, user_id } = useParams<{
    batch_id: string;
    user_id: string;
  }>();

  const { data } = usePaymentInformation({
    batch_id: batch_id!,
    user_id: user_id!,
  });

  const statusClassMap: { [key: string]: string } = {
    APROVADO: 'payment-approved',
    PENDENTE: 'payment-pending',
    GRATUITO: 'payment-free',
    EXPIRADO: 'payment-expired',
  };

  return (
    <div className="flex w-fit flex-col h-fit items-center justify-between gap-4 rounded-md border-2 bg-white p-8 shadow-md">
      <h1 className="text-center text-3xl font-semibold">
        Comprovante de inscricao para o evento: <br /> <b>VI SEMAD</b>
      </h1>

      <div className="flex flex-col justify-around gap-4 font-light">
        <span className="text-pretty text-xl">
          <b>Nome: </b> {data?.user_name}
        </span>
        <span className="text-pretty text-xl">
          {' '}
          <b>E-mail:</b> {data?.email}
        </span>

        <span className="text-pretty text-xl">
          {' '}
          <b>Status do pagamento:</b>{' '}
          <span
            className={statusClassMap[data?.inscricao.status || 'PENDENTE']}
          >
            {data?.inscricao.status}
          </span>
        </span>
        <div className="my-4">
          <h1 className="text-2xl text-center text-pretty font-medium">
            Total:{' '}
            {data?.inscricao.preco.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{' '}
            R$
          </h1>

          <h2 className="text-center text-lg font-light">
            {data?.inscricao.nome_lote}
          </h2>
        </div>
      </div>
      {data?.inscricao.status !== 'GRATUITO' &&
        data?.inscricao.status !== 'REALIZADO' && (
          <div className="w-[80%] flex flex-col gap-2 items-center">
            <h1 className="text-center text-lg font-bold text-red-500">
              Atenção
            </h1>
            <p className="text-center text-base font-light">
              Notamos que foi realizado a inscricao mas nao foi realizado o
              pagamento, caso já tenha efetuado o pagamento nos envie o
              comprovante
            </p>
            <a
              className="mt-2 text-center rounded-full bg-green-500 px-4 py-2 text-xl font-medium text-white"
              href={`https://wa.me/${import.meta.env.VITE_PHONE}?text=${encodeURIComponent(`Olá! Gostaria de enviar o comprovante de inscrição para o SEMAD referente ao inscrito: ${data?.user_name}, de email: ${data?.email}`)}`}
            >
              Enviar Comprovante
            </a>
          </div>
        )}
    </div>
  );
}
