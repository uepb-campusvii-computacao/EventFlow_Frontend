import { Link } from "react-router-dom";

interface EventCardProps {
  slug: string;
  name: string;
  image_url: string;
  location?: string;
}

export function EventCard({
  slug,
  name,
  image_url,
}: EventCardProps) {
  return (
    <Link
      to={`/eventos/${slug}`}
      className="flex h-fit flex-col overflow-hidden rounded-md border shadow-md "
    >
      <img
        className="rounded-t-md transition-transform duration-300 hover:scale-110"
        src={image_url}
        alt={name}
      />
      <div className="p-3">
        <h1 className="text-lg font-semibold leading-tight min-h-11 max-h-11 overflow-hidden overflow-ellipsis line-clamp-2">
          {name}
        </h1>
      </div>
    </Link>
  );
}
