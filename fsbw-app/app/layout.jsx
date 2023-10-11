import "./globals.css";
import Navbar from "./navbar";
import { Inter } from "next/font/google";

import { UserProvider } from "./contexts/user.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "{My Blog Website}",
  description: "Full Stack Blog Website",
};

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body id="root" className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </UserProvider>
  );
}
