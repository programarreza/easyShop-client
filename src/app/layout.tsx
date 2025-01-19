import { fontSans } from "@/src/config/fonts";
import { siteConfig } from "@/src/config/site";

import "@/src/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";

import { Navbar } from "../components/Home/Navbar/Navbar";
import { Providers } from "../lib/Providers";

import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <StoreProvider>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <Toaster />
              <div className="min-h-screen">{children}</div>
            </div>
          </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
