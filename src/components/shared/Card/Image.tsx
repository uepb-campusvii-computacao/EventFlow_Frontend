import React from 'react';

type CardImageProps = {} & React.ImgHTMLAttributes<HTMLImageElement>;

export default function Image({ src, alt, ...props }: CardImageProps) {
  return (
    <img className="rounded-t-md aspect-video" src={src} alt={alt} {...props} />
  );
}
