import "./global.css";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { aboutMeData, pages, contactMeLinks } from "./data/data";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header name={aboutMeData.name} pages={pages} />
        {children}
        <Footer contactMeLinks={contactMeLinks} />
      </body>
    </html>
  );
}
