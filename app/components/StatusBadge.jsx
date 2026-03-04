"use client";

export default function StatusBadge({ visible }) {
  return (
    <div
      className={`
        absolute top-8 left-1/2 -translate-x-1/2
        z-50 pointer-events-none
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
      `}
    >
      <div className="flex items-center gap-3 rounded-full">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </span>

        <span className="text-sm text-white">
          Available for work
        </span>
      </div>
    </div>
  );
}