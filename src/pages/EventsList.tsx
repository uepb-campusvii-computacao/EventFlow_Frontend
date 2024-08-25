import { EventCard } from "@/components/shared/events/EventCard";
import { Header } from "@/components/shared/Header";
import { Input } from "@/components/ui/input";
import { useEvents } from "@/hooks/useEvents";
import { Search } from "lucide-react";

export function EventsList() {
  //const [searchKey, setSearchKey] = useState("");
  const { eventsQuery } = useEvents();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col p-16 max-sm:p-8">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Pesquise o evento"
            //onChange={(e) => setSearchKey(e.target.value)}
            className="pr-12 focus:!ring-purple-500"
          />
          <Search className="absolute right-4" />
        </div>
        <div className="grid grid-cols-4 place-items-center justify-between gap-12 py-8 max-[820px]:grid-cols-2 max-sm:grid-cols-1">
          { eventsQuery.data && eventsQuery?.data.map((item) => (
            <EventCard
              key={item.uuid_evento}
              slug={String(item.uuid_evento)}
              name={item.nome}
              image_url={item.banner_img_url || ""}
            />
          ))}
        </div>
      </main>
    </>
  );
}