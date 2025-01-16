import type { Metadata } from 'next';
import { dir } from 'i18next';
import { Nunito_Sans } from 'next/font/google';

import { languages } from '@/i18n/settings';

import '../../styles/tailwind.css';
import '../../styles/globals.scss';

import Footer from '@/components/layouts/Footer';
import AuthModal from '@/components/Common/AuthModal';
import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from '@/providers/app-provider';

const nunitoSansFont = Nunito_Sans({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-nunito-sans',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const { lng } = params;

  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${nunitoSansFont.variable} ${nunitoSansFont.className} antialiased`}>
        <AppProvider>
          {children}
          <Footer lng={lng} />
          <AuthModal lng={lng} />
          <Toaster position='top-right' />
        </AppProvider>
      </body>
    </html>
  );
}
