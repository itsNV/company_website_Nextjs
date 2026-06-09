import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import BackgroundParticles from "@/components/BackgroundParticles";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Yunawise Techsolve LLP | Enterprise & Headless CMS Software Development Solutions",
  description: "Yunawise Techsolve LLP is a premium IT consulting and web development agency specializing in Headless CMS, custom software, mobile app development, and digital marketing services.",
  keywords: "Yunawise, Yunawise Techsolve, Headless CMS, Web Development Ahmedabad, App Development Gota, Enterprise CMS, WordPress, Strapi, Sanity",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (sessionStorage.getItem("yunawise_preloader_seen")) {
                    document.documentElement.classList.add("preloader-seen");
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-slate-50/50 text-slate-900 is-loading" suppressHydrationWarning>
        <Preloader />
        <BackgroundParticles />
        {children}
      </body>
    </html>
  );
}

