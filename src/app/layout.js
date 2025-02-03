import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';
import { getServerSession } from "next-auth";
import SessionProvider from "@/app/components/SessionProvider";
import { UserProvider } from "./components/UserContext";
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GoFit",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider>
          <SessionProvider session={session}>
            <UserProvider>
              {children}
              {/* <NavMenu /> */}
            </UserProvider>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
