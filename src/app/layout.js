import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "AnkiJr",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
