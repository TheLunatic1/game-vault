import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "Game Vault",
  description: "Your personal game collection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}