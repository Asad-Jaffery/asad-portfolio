import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Asad Jaffery',
  description:
    'Personal site for Asad Jaffery: Shopify, Tesla, USAFacts, Recognize, and UW iSchool.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
