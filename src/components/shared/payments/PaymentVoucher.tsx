import { usePaymentInformation } from '@/hooks/usePaymentInformation';
import { Files } from 'lucide-react';
import toast from 'react-hot-toast';
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
    REALIZADO: 'payment-approved',
    PENDENTE: 'payment-pending',
    GRATUITO: 'payment-free',
    EXPIRADO: 'payment-expired',
  };

  function handleCopy(text: string) {
    navigator.clipboard.writeText(text);
    toast.success('Chave copiada!');
  }

  return (
    <div className="flex w-fit flex-col h-fit items-center justify-between gap-2 rounded-md border-2 bg-white p-8 shadow-md">
      <h1 className="text-center text-3xl font-semibold">Comprovante de inscrição</h1>
      <div>
        <h1 className="text-2xl text-center text-pretty font-medium">
          Total: {data?.inscricao.preco.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })} R$
        </h1>
        <h2 className="text-center text-lg font-light">{data?.inscricao.nome_lote}</h2>
      </div>
      <div className="flex justify-between gap-4 sm:gap-16 flex-col-reverse sm:flex-row">
        <div className="flex flex-col mt-4 gap-4 font-light">
          <span className="text-pretty text-xl">
            <b>Nome:</b> {data?.user_name}
          </span>
          <span className="text-pretty text-xl">
            <b>E-mail:</b> {data?.email}
          </span>
          <span className="text-pretty text-xl">
            <b>Status do pagamento:</b>
            <span className={statusClassMap[data?.inscricao.status || 'PENDENTE']}>
              {data?.inscricao.status}
            </span>
          </span>
          {
            // Precisa ser revisado, pois o tipo atividades não é o tipo esperado em data do EditActivities!
          /* <EditActivities
            data={Object.values(data?.atividades ?? []).flat()}
            onSelect={() => {} }
          /> */}
        </div>

        <div className="flex flex-col items-center justify-center">
          <img
            className="h-[200px] w-[200px]"
            src={data?.payment.qr_code_base64}
            alt="QR Code"
          />
          <button
            onClick={() => handleCopy(data?.payment.qr_code || '')}
            className="button-primary flex items-center gap-2"
          >
            <Files /> copiar e colar
          </button>
        </div>
      </div>
    </div>
  );
}