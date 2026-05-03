"use client";

import Image from "next/image";

export default function CaseImageFrame({
  src,
  alt,
  width = 1600,
  height = 1000,
  frameClassName = "",
  imageClassName = "",
  sizes = "100vw",
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[22px] border border-black/10 bg-bg-secondary p-2",
        frameClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        sizes={sizes}
        className={[
          "h-auto w-full rounded-[14px] border border-black/10",
          imageClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      />
    </div>
  );
}
