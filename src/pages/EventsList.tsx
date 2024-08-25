import { Container } from "@/components/shared/container";
import { EventCard } from "@/components/shared/events/EventCard";
import { Header } from "@/components/shared/Header";
import { Input } from "@/components/ui/input";
import { events_data } from "@/lib/constants";
import { Search } from "lucide-react";

export function EventsList() {
  //const [searchKey, setSearchKey] = useState("");
  const events = events_data;

  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-screen flex-col pt-8">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Pesquise o evento"
              //onChange={(e) => setSearchKey(e.target.value)}
              className="pr-12 focus:!ring-purple-500"
            />
            <Search className="absolute right-4" />
          </div>
          <div className="grid grid-cols-4 place-items-center justify-between gap-10 py-8 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {events.map((item) => (
              <EventCard
                key={item.id}
                slug={String(item.id)}
                name={item.name}
                location={item.location}
                image_url={item.image_url}
                date={item.date}
              />
            ))}
          </div>
        </main>
      </Container>
    </>
  );
}
