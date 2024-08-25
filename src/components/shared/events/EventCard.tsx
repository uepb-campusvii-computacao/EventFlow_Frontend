import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  slug: string;
  name: string;
  image_url: string;
  date?: string;
  location?: string;
}

export function EventCard({
  slug,
  name,
  image_url,
  date = "",
  location = "",
}: EventCardProps) {
  return (
    <Link
      to={`/eventos/${slug}`}
      className="flex h-[248px] flex-col overflow-hidden rounded-md border shadow-md sm:w-[200px] md:w-[288px]"
    >
      <img
        className="rounded-t-md transition-transform duration-300 hover:scale-110 sm:h-[100px] md:h-[116px]"
        src={image_url}
        alt={name}
      />
      <div className="flex h-full flex-col justify-between gap-2 p-3">
        <span className="text-sm font-medium">{date}</span>
        <h1 className="text-lg font-semibold leading-tight">{name}</h1>
        <span className="flex items-center gap-1 text-sm font-light">
          <MapPin strokeWidth={1} size={20} /> {location}
        </span>
      </div>
    </Link>
  );
}
