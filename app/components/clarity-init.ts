"use client";
import Clarity from "@microsoft/clarity";
import { useEffect } from "react";

export default function useMsClarity() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            Clarity.init('vv97icb553');
        }
      }, []);

    return null;
}