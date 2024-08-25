import { Files } from "lucide-react";

export function PaymentVoucher() {
  return (
    <div className="flex w-fit flex-col h-fit items-center justify-between gap-4 rounded-md border-2 bg-white p-8 shadow-md">
      <h1 className="text-center text-3xl font-semibold">
        Comprovante de inscricao para o evento: <br /> <b>VI SEMAD</b>
      </h1>
      <div className="flex flex-col justify-around gap-4 sm:flex-row sm:gap-16">
        <div className="flex flex-1 flex-col justify-center gap-2 text-lg">
          <span className="text-left">
            <b>Nome: </b> Yuri Monteiro
          </span>
          <span className="text-left">
            <b>E-mail:</b> yuri@gmail.com
          </span>
          <span className="text-left">
            <b>Telefone:</b> 83 99991-8888
          </span>
          <span className="text-left">
            <b>Instiuição:</b> UEPB
          </span>
          <span className="text-left">
            <b>Status do pagamento:</b>
            <span className="rounded-md bg-green-500 p-1 font-mono text-sm font-semibold uppercase text-white">
              REALIZADO
            </span>
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-medium">Total: 900,00R$</h1>
          <img
            className="h-[200px] w-[200px]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIy6HNc3zXzJ9-y-rNEfnaSdhcgeXytmnQg&s"
            alt="qr code"
          />
          <button className="button-primary flex items-center gap-2">
            <Files /> copiar e colar
          </button>
        </div>
      </div>
      <div className="w-[80%]">
        <h1 className="text-center text-lg font-bold text-red-500">Atenção</h1>
        <p className="text-center text-base font-light">
          Pagamento com dinheiro físico ou cartão devem ser realizados na
          coordenação do curso em até 3 dias antes do evento
        </p>
      </div>
    </div>
  );
}
