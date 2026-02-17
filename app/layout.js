import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import BottomNav from "./components/BottomNav";

export const metadata = {
  title: "hldkv design",
  description: "independent digital designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={GeistSans.variable}
        style={{ backgroundColor: '#0d0d0c' }}
      >
        <BottomNav />
        {children}
      </body>
    </html>
  );
}
