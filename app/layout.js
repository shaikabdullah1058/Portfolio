import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/components/ThemeProvider";
import CursorTrail from "@/components/CursorTrail";
import portfolioicon from "./portfolioicon.png";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Shaik Mohammad Abdullah",
   icons: {icon:portfolioicon.src,
           shortcut: portfolioicon.src,
           apple: portfolioicon.src,
           },
  description:
    "Full stack developer building fast, well-crafted products at the intersection of frontend engineering and applied AI. Based in Guntur, India.",
  openGraph: {
    title: "Shaik Mohammad Abdullah — Full Stack Engineer",
    description:
      "Full stack developer building fast, well-crafted products at the intersection of frontend engineering and applied AI.",
    type: "website",
  },
  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ThemeProvider>
          <CursorTrail />
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--text-primary)",
                color: "var(--bg-primary)",
                borderRadius: "3px",
                fontSize: "13px",
                fontFamily: "var(--font-mono)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
