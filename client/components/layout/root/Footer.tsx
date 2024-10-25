import Link from "next/link";

export default function Footer() {
  const links = [
    { name: "ওয়েবসাইট ", link: "/useful-links#website" },
    { name: "Youtube", link: "/useful-links#youtube" },
    { name: "ফেইসবুক ", link: "/useful-links#facebook" },
    { name: "টেলিগ্রাম ", link: "/useful-links#telegram" },
  ];

  return (
    <footer className="py-6">
      <div className=" w-full">
        <h3 className="text-lg font-semibold mb-4"> প্রয়োজোনীয় লিংক সমূহ</h3>

        <div className="flex flex-wrap justify-between">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.link}
              rel="noopener noreferrer"
              className="block mb-2 hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="text-center mt-6 text-sm">
          &copy; 2024 Ummahr Chintah. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
