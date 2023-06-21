import "@/styles/globals.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "𝓁𝒾𝓋𝒾𝓃𝑔 𝒹𝒾𝑔𝒾𝓉𝒶𝓁 𝒶𝓇𝒸𝒽𝒾𝓋𝑒𝓈",
  description:
    "An archive of the deleted websites on Yahoo! Geocities in the context of modern web frameworks—capturing the tension between a lost past and a distant future.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "𝓁𝒾𝓋𝒾𝓃𝑔 𝒹𝒾𝑔𝒾𝓉𝒶𝓁 𝒶𝓇𝒸𝒽𝒾𝓋𝑒𝓈",
    description:
      "An archive of the deleted websites on Yahoo! Geocities in the context of modern web frameworks—capturing the tension between a lost past and a distant future.",
    images: "https://living-digital-archives.bhris.digital/og_image.jpg",
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
