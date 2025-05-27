import { Button } from "@/shared/components/ui/button";
import { Toggle } from "@radix-ui/react-toggle";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/components/ui/alert-dialog';
import { BrickCardMp } from "@/shared/components/BrickMP";

type props = {
paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  selectedBatchValue: number;
  selectedBatch: string;
  selectedActivities: string[];
  isSubmitting: boolean;
  handleSubscribeInEvent: () => Promise<string | void>;
 }

 export function  SelectMethodPayment({
  paymentMethod,
  setPaymentMethod,
  selectedBatchValue,
  selectedBatch,
  selectedActivities,
  isSubmitting,
  handleSubscribeInEvent,
}:props){
    return(
        <>
         {selectedBatchValue > 0 ? (
        <div className="grid grid-cols-2 gap-5 ">
          <Toggle
            onClick={() => setPaymentMethod('pix')}
            className={`border-[1px] border-black px-4 py-2 transition-all duration-300 ${
              paymentMethod === 'pix'
                ? 'border-blue-600 shadow-lg shadow-blue-600'
                : ''
            }`}
          >
            Pix
          </Toggle>
          <Toggle
            onClick={() => setPaymentMethod('card')}
            className={`border-[1px] border-black px-4 py-2 transition-all duration-300 ${
              paymentMethod === 'card'
                ? 'border-blue-600 shadow-lg shadow-blue-600'
                : ''
            }`}
          >
            Cartão
          </Toggle>
        </div>
      ) : selectedBatch ? (
        <Button
          disabled={isSubmitting}
          onClick={() => handleSubscribeInEvent()}
        >
          Inscrever-se
        </Button>
      ) : null}
      {paymentMethod === 'pix' ? (
        <div className="flex items-center justify-center p-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="default"
                className="bg-blue-500 hover:bg-blue-800"
              >
                Inscrever-se
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmação de inscrição?</AlertDialogTitle>
                <AlertDialogDescription>
                  Você está prestes a realizar uma transação via PIX, tem
                  certeza que deseja continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isSubmitting}
                  onClick={() => handleSubscribeInEvent()}
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : null}
      {paymentMethod === 'card' ? (
        <BrickCardMp
          amount={selectedBatchValue + selectedBatchValue * 0.0498}
          loteId={selectedBatch}
          selectedActivities={selectedActivities}
        />
      ) : null}
        </>
    )
 }
