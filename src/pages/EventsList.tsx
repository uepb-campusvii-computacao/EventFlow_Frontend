import { Container } from '@/components/shared/Container';
import { EventCard } from '@/components/shared/events/EventCard';
import { Header } from '@/components/shared/Header';
import { SkeletonLoader } from '@/components/shared/skeletonLoader';
import { Input } from '@/components/ui/input';
import { useEvents } from '@/hooks/useEvents';
import { Search } from 'lucide-react';
import { useState } from 'react';



export function EventsList() {
  const [searchKey, setSearchKey] = useState('');
  const { eventsQuery } = useEvents();

  return (
    <>
      <Header />
      <Container>
        <main className="flex min-h-screen flex-col py-16 max-sm:py-8">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Pesquise o evento"
              onChange={(e) => setSearchKey(e.target.value.toLowerCase())}
              className="pr-12 focus:!ring-purple-500"
            />
            <Search className="absolute right-4" />
          </div>

          <div className="grid grid-cols-4 place-items-center justify-between gap-4 py-8 max-[1200px]:grid-cols-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
            {eventsQuery.isLoading
              ? <SkeletonLoader amount={8} />
              : eventsQuery.data &&
                eventsQuery.data
                  .filter((item) => {
                    if (searchKey.trim() === '') {
                      return true;
                    }

                    // enquanto estivermos sem a data sendo enviada para alguns eventos
                    if (!item.date) {
                      item.date = '';
                    }

                    // Verifica se algum campo contém a chave de busca
                    const containsSearchResult =
                      item.nome.toLowerCase().includes(searchKey) ||
                      item.date.toLowerCase().includes(searchKey);
                    return containsSearchResult;
                  })
                  .map((item) => (
                    <EventCard
                      key={item.uuid_evento}
                      slug={String(item.slug)}
                      name={item.nome}
                      image_url={item.banner_img_url || ''}
                    />
                  ))}
          </div>
        </main>
      </Container>
    </>
  );
}
