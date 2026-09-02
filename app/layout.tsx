import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrendSpark — Find your next viral video",
  description: "Discover trends and turn them into YouTube video ideas."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
