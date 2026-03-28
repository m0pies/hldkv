import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import ClarityInit from "./clarity-init";

export const metadata = {
  title: "Егор Холодков | Веб-дизайнер",
  description: "Делаю сайты для бизнеса с фокусом на результат",
  keywords: ["веб-дизайнер", "дизайн сайтов", "лендинг", "многостраничный сайт", "frontend разработка"],

  openGraph: {
    title: "Егор Холодков | Веб-дизайнер",
    description: "Делаю сайты для бизнеса с фокусом на результат",
    url: "https://www.hldkv.com/",
    siteName: "Егор Холодков | Веб-дизайнер",
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
    title: "Егор Холодков | Веб-дизайнер",
    description: "Делаю сайты для бизнеса с фокусом на результат",
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
