"use client";

import { useEffect } from "react";

export default function RestoreScrollBehavior() {
  useEffect(() => {
    if (window.sessionStorage.getItem("restore-scroll-behavior") !== "true") {
      return;
    }

    document.documentElement.style.scrollBehavior = "";
    window.sessionStorage.removeItem("restore-scroll-behavior");
  }, []);

  return null;
}
