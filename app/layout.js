import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/BottomNav";
import ClarityInit from "./components/clarity-init";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "HLDKV Design – Digital Product Designer ",
  description: "Creative digital designer specializing in UI/UX, web design and frontend development. From idea to structure, from structure to product.",
  keywords: ["web designer", "ui ux designer", "frontend developer", "digital product designer", "interactive websites"],

  openGraph: {
    title: "HLDKV Design",
    description: "Digital Product Designer & Frontend Developer crafting modern interactive experiences.",
    url: "https://www.hldkv.com/",
    siteName: "HLDKV",
    images: [
      {
        url: "https://www.hldkv.com/og.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "HLDKV Design",
    description: "UI/UX Designer & Frontend Developer creating modern digital products.",
    images: ["https://www.hldkv.com/og.png"],
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={geist.className}
        style={{ backgroundColor: '#0d0d0c' }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
        <Navbar />
        {children}
        <ClarityInit />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
