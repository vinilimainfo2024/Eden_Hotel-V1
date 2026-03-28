import { Montserrat } from "next/font/google"; // Importando a fonte
import "./globals.css";

// Configurando a fonte
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ['300', '400', '700', '900'], // Pesos: leve, normal, negrito e extra-negrito
  variable: '--font-montserrat',
});

export const metadata = {
  title: "EdenHotel",
  description: "Reserva de luxo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      {/* Aplicamos a classe da fonte no body */}
      <body className={`${montserrat.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}