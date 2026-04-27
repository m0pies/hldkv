"use client";

import { useEffect } from "react";

export default function InstantScrollTop() {
  useEffect(() => {
    const html = document.documentElement;
    const previousScrollBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    return () => {
      html.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return null;
}
