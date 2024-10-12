import localFont from "next/font/local";

const geistSans = localFont({
  src: "../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const primaryFont = localFont({
  src: "../app/fonts/Li Shobuj Borno Unicode.ttf",
  variable: "--font-lalsobuj",
  weight: "100 700",
});

const secondaryFont = localFont({
  src: "../app/fonts/Li Shadhinata 2.0 Unicode.ttf",
  variable: "--font-shadinota",
  weight: "100 700",
});

const secondaryFontItalic = localFont({
  src: "../app/fonts/Li Shadhinata 2.0 Unicode Italic.ttf",
  variable: "--font-shadinota2",
  weight: "100 700",
});

export {
  geistMono,
  geistSans,
  primaryFont,
  secondaryFont,
  secondaryFontItalic,
};
