import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '700', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: "EdenHotel | Luxury Experience",
  description: "Onde a sofisticação encontra o paraíso.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={montserrat.variable}>
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}