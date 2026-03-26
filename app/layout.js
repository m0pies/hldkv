import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import ClarityInit from "./clarity-init";

export const metadata = {
  title: "Egor Design",
  description: "Дизайн и разработка сайтов: лендинги, многостраничные сайты и цифровые интерфейсы с понятной структурой.",
  keywords: ["веб-дизайнер", "дизайн сайтов", "лендинг", "многостраничный сайт", "frontend разработка"],

  openGraph: {
    title: "Egor Design",
    description: "Дизайн и разработка сайтов с акцентом на структуру, подачу и удобство.",
    url: "https://www.hldkv.com/",
    siteName: "Egor Design",
    images: [
      {
        url: "https://www.hldkv.com/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Egor Design",
    description: "Дизайн и разработка сайтов с акцентом на структуру и удобство.",
    images: ["https://www.hldkv.com/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body style={{ backgroundColor: "var(--color-bg-outer)" }}>
        {children}
        <ClarityInit />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
