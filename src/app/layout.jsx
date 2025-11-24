import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "./Navbar";

export const metadata = {
  title: "Game Vault",
  description: "Your personal game collection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SessionWrapper>
          <ThemeProvider>
            <ToastProvider />
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </SessionWrapper>
        <Footer />
      </body>
    </html>
  );
}