import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChatNova — Messenger & Instagram AI Чатбот",
  description: "AI чатбот. Бүтээгдэхүүний санал болгох, захиалга хүлээн авах, QPay төлбөр, цаг товлох — бүгдийг автоматжуул.",
  keywords: "AI chatbot, Messenger, Instagram, QPay, Mongolian business, автомат чатбот",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}
