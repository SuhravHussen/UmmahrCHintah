export default function Footer() {
  const links = [
    { name: "chintaporadh", link: "https://chintaporadh.com/" },
    { name: "shamsularefin", link: "https://shamsularefin.com" },
    { name: "hoytoba", link: "https://hoytoba.com/" },
    { name: "irfan sadik", link: "https://irfansadik.substack.com/" },
  ];

  return (
    <footer className="py-6">
      <div className="container mx-auto px-4">
        <div>
          <h3 className="text-lg font-semibold mb-4">গুরুত্বপূর্ণ ওয়েবসাইট</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2 hover:underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-6 text-sm">
          &copy; 2024 Ummahr Chintah. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
