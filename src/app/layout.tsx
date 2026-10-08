import type { Metadata } from "next";
import { Poppins, Cairo } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const cairo = Cairo({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fadma Hsayn Cars - Location de voitures au Maroc | Marrakech, Merzouga, Errachidia",
    template: "%s | Fadma Hsayn Cars",
  },
  description:
    "Louez une voiture à Marrakech, Merzouga ou Errachidia avec Fadma Hsayn Cars. Livraison aéroport, assurance incluse, kilométrage illimité et assistance 24/7. Réservez maintenant via WhatsApp.",
  keywords: [
    "location voiture Marrakech",
    "car rental Marrakech Airport",
    "location voiture Merzouga",
    "Errachidia Airport car rental",
    "location voiture aéroport Maroc",
    "كراء السيارات مراكش",
    "كراء سيارة مرزوكة",
  ],
  authors: [{ name: "Fadma Hsayn Cars" }],
  creator: "Fadma Hsayn Cars",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    alternateLocale: ["ar_MA", "en_US"],
    url: "https://fadmahsayncars.com",
    siteName: "Fadma Hsayn Cars",
    title: "Fadma Hsayn Cars - Location de voitures au Maroc",
    description:
      "Location de voitures dans les aéroports de Marrakech, Merzouga et Errachidia. Assurance incluse, kilométrage illimité, support 24/7.",
    images: [
      {
        url: "/images/sora1.jpeg",
        width: 1200,
        height: 630,
        alt: "Fadma Hsayn Cars - Car rental Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fadma Hsayn Cars - Location de voitures au Maroc",
    description: "Location de voitures à Marrakech, Merzouga et Errachidia. Réservez maintenant.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://fadmahsayncars.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${cairo.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CarRental",
              name: "Fadma Hsayn Cars",
              description:
                "Location de voitures dans les aéroports de Marrakech, Merzouga et Errachidia",
              url: "https://fadmahsayncars.com",
              telephone: "+212661371670",
              email: "fadmahsayncarrs@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MA",
                addressRegion: "Marrakech-Safi",
              },
              areaServed: [
                { "@type": "City", name: "Marrakech" },
                { "@type": "City", name: "Merzouga" },
                { "@type": "City", name: "Errachidia" },
              ],
              priceRange: "300-600 MAD",
              openingHours: "Mo-Su 00:00-23:59",
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
