import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";

import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "./Navbar";

export const metadata = {
  title: "Game Vault",
  description: "Your personal game collection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <ThemeProvider>
            <ToastProvider />
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}