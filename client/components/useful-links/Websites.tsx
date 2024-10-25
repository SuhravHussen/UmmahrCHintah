import { secondaryFont } from "@/lib/fonts";
import React from "react";
import { Separator } from "../ui/separator";

export default function Websites() {
  const links = [
    { name: "chintaporadh", link: "https://chintaporadh.com/" },
    { name: "shamsularefin", link: "https://shamsularefin.com" },
    { name: "hoytoba", link: "https://hoytoba.com/" },
    { name: "irfan sadik", link: "https://irfansadik.substack.com/" },
    {
      name: "Response to anti islam",
      link: "https://response-to-anti-islam.com/",
    },
  ];
  return (
    <div className="my-6" id="website">
      <h1 className={`text-2xl  ${secondaryFont.className}`}>ওয়েবসাইট </h1>
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
