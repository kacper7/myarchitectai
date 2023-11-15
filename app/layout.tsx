import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import "../styles/globals.css";
import Providers from "../components/Providers";
import { Inter_Tight } from "next/font/google";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "next-auth/react";
import { User, createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { SupabaseProvider } from "../components/supabaseProvider";
import Header from "../components/Header";
import Head from "next/head";
import Script from "next/script";
import { Crisp } from "crisp-sdk-web";

let title = "MyArchitectAI | Visualize your ideas in seconds.";
let description = "MyArchitectAI";
let ogimage = "https://myarchitectai.vercel.app/og-image.png";

const inter = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title,
    description,
    url: "https://myarchitectai.vercel.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        id="gtag-manager"
        strategy="afterInteractive"
      >
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PB8G4DM6');
        `}
      </Script>
      <Script id="crisp-chat" strategy="afterInteractive">
        {`
          window.$crisp=[];window.CRISP_WEBSITE_ID="7f07d665-b3d3-4cd0-9792-a7d2e1118264";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
        `}
      </Script>
      <SupabaseProvider>
        <body style={{ zIndex: 2 }} className={inter.className}>
          <Providers>{children}</Providers>
          <Analytics />
          <noscript
          >
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PB8G4DM6"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>

        </body>
      </SupabaseProvider>
    </html>
  );
}
