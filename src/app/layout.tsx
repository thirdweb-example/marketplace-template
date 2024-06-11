import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: "100px" }}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
