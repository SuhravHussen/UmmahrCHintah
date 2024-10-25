import { secondaryFont } from "@/lib/fonts";
import React from "react";
import { Separator } from "../ui/separator";

export default function Youtube() {
  const links = [
    {
      name: "hoytoba",
      link: "https://www.youtube.com/channel/UCHc1GdBjh8SgGjlaUyCHbEA",
    },
    {
      name: "IlmShare- Sab'a Sanabil",
      link: "https://www.youtube.com/@IlmShareSabaSanabil",
    },
    {
      name: "SEAN Publication",
      link: "https://www.youtube.com/@seanpublicationltd",
    },
    { name: "Baseera", link: "https://www.youtube.com/@BaseeraMedia" },
    {
      name: "ইসলামিক অডিওবুক",
      link: "https://www.youtube.com/@IslamicAudiobook",
    },
    {
      name: "Beyond The Lote Tree",
      link: "https://www.youtube.com/@BeyondTheLoteTree",
    },
    {
      name: "The Muslim Skeptic",
      link: "https://www.youtube.com/@MuslimSkeptic",
    },
    {
      name: "Rain Drops Media",
      link: "https://www.youtube.com/@RaindropsmediaOrg2015",
    },
  ];
  return (
    <div className="my-6" id="youtube">
      <h1 className={`text-2xl  ${secondaryFont.className}`}>Youtube </h1>
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
