import { StatusBrickMp } from "@/components/shared/BrickMP";
import { Header } from "@/components/shared/Header";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useUserRegistrationInEvent } from "@/hooks/useEventInscription";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "@/hooks/useEvents";
import { useCookies } from "react-cookie";


export function Payment() {
  const { slug } = useParams();
  const { findEvent } = useEvents(slug);
  const { data: subscribed } = useUserRegistrationInEvent(
    findEvent?.uuid_evento
  );
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  
  const [paymentId, setPaymentId] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/user/in-event/${findEvent?.uuid_evento}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPaymentId(response.data.id_payment_mercado_pago);
    }
    fetchData()
  },[]);

  if(!subscribed){
    navigate("/")
  }
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100dvh-4rem)] w-full justify-center bg-accent p-2 md:p-12">
        <StatusBrickMp paymentId={paymentId} />
      </main>
    </>
  );
}


