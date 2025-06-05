import React from 'react';

type CardImageProps = {} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function Image({ src, alt, ...props }: CardImageProps) {
  return (
    <img
      className="rounded-t-md aspect-video object-cover border-b border-gray-800 w-full"
      src={src}
      alt={alt}
      {...props}
    />
  );
}
