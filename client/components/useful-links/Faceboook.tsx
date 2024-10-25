import { secondaryFont } from "@/lib/fonts";
import React from "react";
import { Separator } from "../ui/separator";

export default function Facebook() {
  const links = [
    { name: "Asif Adnan", link: "https://www.facebook.com/AsifAdnan88" },
    {
      name: "Shamsul Arefin Shakti",
      link: "https://www.facebook.com/shamsul.shakti",
    },
    { name: "Irfan Sadik ", link: "https://www.facebook.com/irfansadik.435" },
    {
      name: "Mehedi Hasan  ",
      link: "https://www.facebook.com/Dr.mehedi.hasan.0",
    },
    { name: "Ahmed Rafique", link: "https://www.facebook.com/ahmedrafique99" },
    {
      name: "Asif Muhammad ",
      link: "https://www.facebook.com/AsifMuhammadOfficial",
    },
    {
      name: "Hammad Osama ",
      link: "https://www.facebook.com/profile.php?id=100009693164390",
    },
    {
      name: "ড. ইয়াদ কুনাইবী  ",
      link: "https://www.facebook.com/EyadQunaibiBN",
    },
    {
      name: "Abdullah Al-Rayhan ",
      link: "https://www.facebook.com/profile.php?id=100073469434459",
    },
    {
      name: "মোহাইমিন পাটোয়ারী  ",
      link: "https://www.facebook.com/mohaimin1",
    },
    {
      name: "Hammad Osama ",
      link: "https://www.facebook.com/profile.php?id=100009693164390",
    },
    {
      name: "ড. ইয়াদ কুনাইবী  ",
      link: "https://www.facebook.com/EyadQunaibiBN",
    },
    { name: "আরিফ আজাদ ", link: "https://www.facebook.com/arifazad.official" },
    { name: "Khijir Hayat  ", link: "https://www.facebook.com/khijir.h.ii" },
    {
      name: "Iftekhar Hossain Simanto  ",
      link: "https://www.facebook.com/simantohossainiftekhar",
    },
    {
      name: "Mohammad Mozammel Hoque",
      link: "https://www.facebook.com/MH.philosophy",
    },
    {
      name: "Asif Mahtab Utsha ",
      link: "https://www.facebook.com/profile.php?id=100055436756697",
    },

    { name: "M. Mahbubur Rahman ", link: "https://www.facebook.com/mahbub687" },
    { name: "Anika Tuba   ", link: "https://facebook.com/anika.tuba.58" },
    {
      name: "তানভীর হায়দার ",
      link: "https://www.facebook.com/tanvirhaider2030",
    },
    {
      name: "Omar Bin Mahtab ",
      link: "https://www.facebook.com/omar.binmahtab",
    },
    {
      name: "Dr. Eyad Qunaibi - English ",
      link: "https://www.facebook.com/EyadQunaibi1",
    },
    { name: "Zim Tanvir ", link: "https://www.facebook.com/ztanvir" },
    {
      name: "The Muslim Skeptic - Bangla ",
      link: "https://www.facebook.com/profile.php?id=100088677491441",
    },
    { name: "Islam Zone ", link: "https://www.facebook.com/islamzone.org" },
    {
      name: "Md Sharif Abu Hayat ",
      link: "https://www.facebook.com/sharif.abu.hayat",
    },
    {
      name: "Rafan Ahmed  ",
      link: "https://www.facebook.com/rafanahmedofficial",
    },
    {
      name: "Muhammad Mushfiqur Rahman Minar ",
      link: "https://www.facebook.com/mdmushfiqur.rahmanminar",
    },
    {
      name: "Abu MuHammad Rafiuzzaman ",
      link: "https://www.facebook.com/mhrafiuzzaman",
    },
    {
      name: "Iftekhar Sifat ",
      link: "https://www.facebook.com/iftekhar.sifat.1",
    },
    {
      name: "Abu MuHammad Rafiuzzaman ",
      link: "https://www.facebook.com/mhrafiuzzaman",
    },
  ];
  return (
    <div className="my-6" id="facebook">
      <h1 className={`text-2xl  ${secondaryFont.className}`}>ফেইসবুক </h1>
      <Separator className="my-4" />
      <div className="flex flex-wrap gap-6 justify-between my-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg hover:underline"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
