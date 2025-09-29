import '@/app/ui/global.css';
import {inter} from '@/app/ui/fonts';
import { Metadata } from 'next';

// Adding metadata to the app
export const metadata: Metadata ={
  title : {
    template: '%s | Ledger Dashboard ',
    default: 'Ledger Dashboard',
  },
  description: 'Ledger is a simple and efficient web application that helps businesses track, organize, and manage invoices with ease.' ,
  metadataBase: new URL('https://ledger-box.vercel.app/'),
}

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
