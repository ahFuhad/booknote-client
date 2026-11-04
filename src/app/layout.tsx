import "./globals.css";
import type { ReactNode } from "react";
import { Providers, Nav, Foot } from "@/components/ui";
export const metadata = {
  title: {
    default: "BookNook | A little place for big ideas",
    template: "BookNook | %s",
  },
  description: "Discover, share, borrow, and return books.",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <main>{children}</main>
          <Foot />
        </Providers>
      </body>
    </html>
  );
}
