"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

const ImageWithFallback = ({
  fallback,
  alt,
  src,
  ...props
}: {
  fallback: string | StaticImageData;
  alt: string;
  src: string | StaticImageData;
} & React.ComponentProps<typeof Image>) => {
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallback : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
