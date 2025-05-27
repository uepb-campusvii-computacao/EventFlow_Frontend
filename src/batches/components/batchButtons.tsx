import { Batch } from "../domain/batchesentity";

type batchProps ={
    batchs? : Batch[];
    setSelectedBatch : Function;
    setSelectedBatchValue: Function;
    paymentMethod: String;
    selectedBatch: String;
}

export function BatchButtons({batchs,setSelectedBatch,setSelectedBatchValue,paymentMethod,selectedBatch}:batchProps) {
    return (
      <>
        {batchs ? (
          batchs.map((item) => (
            <button
              key={item.uuid_lote}
              onClick={() => {
                setSelectedBatch(item.uuid_lote || '');
                setSelectedBatchValue(item.preco);
              }}
              className={`rounded-md shadow-md border sm:w-auto w-full bg-slate-100 p-4 flex flex-col gap-1 ${
                selectedBatch === item.uuid_lote
                  ? 'border-blue-500'
                  : 'border-accent'
              }`}
            >
              <h2 className="font-semibold text-lg">{item.nome}</h2>
              <span className="font-light">{item.descricao}</span>
              <span className="font-semibold">
                {item.preco > 0
                  ? `R$ ${item.preco.toFixed(2).replace('.', ',')}`
                  : 'Gratuito'}
              </span>
              <span className="font-light text-sm italic">
                {paymentMethod !== ''
                  ? paymentMethod === 'card'
                    ? `+ R$ ${(Number(item.preco) * 0.0498).toFixed(2).replace('.', ',')}`
                    : `+ R$ ${(Number(item.preco) * 0.0099).toFixed(2).replace('.', ',')}`
                  : null}
              </span>
            </button>
          ))
        ) : (
          <div>
            <p>Não há lotes disponíveis para inscrição neste evento.</p>
          </div>
        )}
      </>
    );
  }