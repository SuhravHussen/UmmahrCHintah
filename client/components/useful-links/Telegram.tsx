import { secondaryFont } from "@/lib/fonts";
import React from "react";
import { Separator } from "../ui/separator";

export default function Telegram() {
  const links = [
    { name: "Audio Archive", link: "https://t.me/Audio_Archive_0x0" },
    { name: "Pdf Archive", link: "https://t.me/PDF_Archive_0x0" },
    { name: "Do Halal Design", link: "https://t.me/dohalaldesign" },
    { name: "Ilm-Share Sab'a Sanabil", link: "https://t.me/sabasanabil" },
    { name: "Hujur's Thought", link: "https://t.me/HujursThought" },
    { name: "Ruqyah Support BD", link: "https://t.me/ruqyahbd" },
    { name: "Mohammad Abid", link: "https://t.me/abidmohammad" },
    { name: "Dr. Eyad Qunaibi English", link: "https://t.me/EyadQunaibi1" },
    { name: "Muslimmatrix", link: "https://t.me/muslimatrix" },
    { name: "Shamsul Arefin shakti", link: "https://t.me/ShamsulArefin2091" },
    { name: "Daniel Haqiqatjou", link: "https://t.me/haqiqatjou" },
    { name: "Tanvir Haider", link: "https://t.me/tanvirhaider" },
    { name: "Irfan Sadik", link: "https://t.me/cognitivecoterie2" },
    { name: "Bearded Bengali", link: "https://t.me/wh3sk" },
  ];
  return (
    <div className="my-6" id="telegram">
      <h1 className={`text-2xl  ${secondaryFont.className}`}>টেলিগ্রাম </h1>
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
