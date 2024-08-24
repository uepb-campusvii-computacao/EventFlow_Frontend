import { Input } from "@/components/ui/input";
import { events_batchs } from "@/lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { SearchPayment } from "../payments/SearchPayment";

const subscribeFormSchema = z.object({
  batch_id: z.string(),
  name: z.string(),
  email: z.string().email(),
  college: z.string(),
  phone: z.string(),
});

type SubscribeFormSchema = z.infer<typeof subscribeFormSchema>;

export function SubscribeForm() {
  const batchs = events_batchs;
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SubscribeFormSchema>({
    resolver: zodResolver(subscribeFormSchema),
  });

  function handleRegisterSubscriberInEvent(data: SubscribeFormSchema) {
    console.log("Selected batch ID:", data.batch_id);
  }

  function handleBatchClick(id: string) {
    setSelectedBatch(id);
    setValue("batch_id", id);
  }

  return (
    <form
      className="flex w-full flex-col items-center justify-between gap-4 rounded-md border-2 bg-white p-8 shadow-md sm:w-[60%]"
      onSubmit={handleSubmit(handleRegisterSubscriberInEvent)}
    >
      <h1 className="mx-4 text-2xl font-medium">Escolha o lote</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {batchs.map((item) => (
          <div
            key={item.id}
            className={`flex w-full cursor-pointer flex-col rounded-md border-2 p-8 shadow-md ${
              selectedBatch === item.id ? "border-blue-500" : "border-accent"
            }`}
            onClick={() => handleBatchClick(item.id)}
          >
            <strong className="text-lg font-medium">{item.name}</strong>
            <p className="font-light">{item.description}</p>
            <span className="mt-2 font-mono text-base">
              $ {item.price.toFixed(2)}
            </span>
          </div>
        ))}
        <input type="hidden" {...register("batch_id")} />
        {errors.batch_id && (
          <p className="text-red-500">{errors.batch_id.message}</p>
        )}
      </div>
      <h1 className="text-2xl font-medium">Preencha seus dados</h1>
      <div className="grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
        <Input
          className="text-lg"
          type="text"
          placeholder="Nome completo"
          {...register("name")}
        />
        <Input
          className="text-lg"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
        <Input
          className="text-lg"
          type="text"
          placeholder="Instituição"
          {...register("college")}
        />
        <Input
          className="text-lg"
          type="text"
          placeholder="Telefone"
          {...register("phone")}
        />
      </div>

      <div className="mt-4 grid w-full grid-cols-2 gap-2 max-sm:grid-cols-1">
        <button className="button-secondary">Voltar</button>
        <Link to="/pagamento/1111" className="button-primary">
          Inscreve-se
        </Link>
      </div>
      <SearchPayment />
    </form>
  );
}