import Link from "next/link";

function buttonClassName(className = "") {
  return [
    "inline-flex items-center justify-center rounded-full bg-text-primary px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text base sm:text-lg lg:text-xl font-medium text-bg-primary transition-opacity duration-300 hover:opacity-85",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button({
  href,
  children,
  target,
  rel,
  className,
}) {
  const isExternal = href.startsWith("http");
  const resolvedRel = target === "_blank" ? rel ?? "noreferrer" : rel;

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={resolvedRel}
        className={buttonClassName(className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      target={target}
      rel={resolvedRel}
      className={buttonClassName(className)}
    >
      {children}
    </Link>
  );
}
