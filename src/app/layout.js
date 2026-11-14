import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "KidoraBazar - Raha Intelligence Study Book",
  description: "মোবাইল আসক্তি কমান, ব্রেইন পাওয়ার বাড়ান",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1516672257182419');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 font-sans">
        {children}

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1516672257182419&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
      </body>
    </html>
  );
}
