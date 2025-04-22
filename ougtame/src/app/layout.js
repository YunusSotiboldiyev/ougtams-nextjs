import "./globals.css";
import { LanguageProvider } from "./components/LanguageContext";
import { CurrencyProvider } from "./components/CurrencyContext";

export const metadata = {
  title: "InGame.uz",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
        <CurrencyProvider>
          {children}
        </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
