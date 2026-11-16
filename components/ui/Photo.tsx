"use client";

import { useEffect, useRef, useState } from "react";

/** A photograph in a frame. If the file fails to load, the frame says what
 *  belongs there instead of showing a broken image. */
export default function Photo({
  src,
  alt,
  width,
  height,
  ratio = "45",
  position,
  priority = false,
  standIn,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  ratio?: "45" | "43" | "32";
  position?: string;
  priority?: boolean;
  standIn?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  // An image that failed before hydration never fires onError; check once mounted.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <figure className={`photo photo--${ratio} ${className}`}>
      {failed ? (
        <span className="photo__stand-in">{standIn ?? `Photograph to come: ${alt}`}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          style={position ? { objectPosition: position } : undefined}
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
}
