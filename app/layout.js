import { Geist } from "next/font/google";
import "./globals.css";
import BottomNav from "./components/BottomNav";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "hldkv design",
  description: "independent digital designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={geist.className}
        style={{ backgroundColor: '#0d0d0c' }}
      >
        <BottomNav />
        {children}
      </body>
    </html>
  );
}
