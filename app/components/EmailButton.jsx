"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyEmailButton() {
  const email = "hldkv.dsgn@gmail.com";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={() => window.location.href = `mailto:${email}`}
      className="
        group inline-flex items-center gap-2
        text-[#7d7d7d] 
        transition-colors duration-200
        cursor-pointer font-medium
      "
    >
      <div
        onClick={copyToClipboard}
        className="
          text-[#7d7d7d] 
          hover:text-white
          transition-colors duration-200
          cursor-pointer py-2
        "
      >
        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
      </div>

      <span className="group-hover:text-white transition-colors duration-200">
        {email}
      </span>
    </button>
  );
}