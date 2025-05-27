import { Activities } from '@/activities/domain/activityEntity';
import { BatchButtons } from '@/batches/components/batchButtons';
import { EventBatch } from '@/types';
import { SelectMethodPayment } from '@/payments/components/selectMethodPayment';
import { ActivitySection } from '@/activities/components/activitySection';

type props = {
  batchs: EventBatch[] | undefined;
  selectedBatch: string;
  setSelectedBatch: React.Dispatch<React.SetStateAction<string>>;
  setSelectedBatchValue: React.Dispatch<React.SetStateAction<number>>;
  paymentMethod: string;
  activities: Activities | undefined;
  activityDetails: {
    key: keyof Activities;
    label: string;
    color: string;
  }[];
  selectedActivities: string[];
  setSelectedActivities: (value: React.SetStateAction<string[]>) => void;
  selectedBatchValue: number;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
  handleSubscribeInEvent: () => Promise<string | void>;
};

export function InscriptionSection({
  batchs,
  selectedBatch,
  setSelectedBatch,
  setSelectedBatchValue,
  paymentMethod,
  activities,
  activityDetails,
  selectedActivities,
  setSelectedActivities,
  selectedBatchValue,
  setPaymentMethod,
  isSubmitting,
  handleSubscribeInEvent,
}: props) {
  return (
    <div className="rounded-md bg-white p-8 w-full gap-4 flex flex-col  items-center justify-center">
      <div className="flex gap-2 flex-wrap w-full">
        <BatchButtons
          batchs={batchs}
          selectedBatch={selectedBatch}
          setSelectedBatch={setSelectedBatch}
          setSelectedBatchValue={setSelectedBatchValue}
          paymentMethod={paymentMethod}
        />
      </div>

      {activities && (
       <ActivitySection
       activities ={activities}
  activityDetails ={activityDetails}
  selectedActivities ={selectedActivities}
  setSelectedActivities ={setSelectedActivities}
       />
      )}
      <SelectMethodPayment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        selectedBatchValue={selectedBatchValue}
        selectedBatch={selectedBatch}
        selectedActivities={selectedActivities}
        isSubmitting={isSubmitting}
        handleSubscribeInEvent={handleSubscribeInEvent}
      />
    </div>
  );
}
