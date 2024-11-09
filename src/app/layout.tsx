import type { Metadata } from "next";
import "./globals.css";
import { nunito, shortStack } from "@/utils/fonts";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
  title: "Pet Tales",
  description: "Pet Tales is a platform for pet lovers to share their stories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html className="bg-[#F2F4F7] " lang="en">
        <body
          className={`  mx-auto ${nunito} ${shortStack} font-sans `}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}
