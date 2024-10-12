"use client";

import ThemeToggle from "@/components/toggle-theme";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between mt-2 md:mt-6">
      <div className="flex gap-3 md:gap-6 sm:text-lg md:text-2xl  font-medium">
        <Link
          href="/"
          className={`${
            pathname === "/" ? "link-active" : "link-inactive"
          } hover:link-active `}
        >
          Home
        </Link>
        <Link
          href="/articles"
          className={`${
            pathname === "/articles" ? "link-active " : "link-inactive"
          } hover:link-active `}
        >
          Articles
        </Link>
        <Link
          href="/authors"
          className={`${
            pathname === "/authors" ? "link-active " : "link-inactive"
          } hover:link-active `}
        >
          Authors
        </Link>
      </div>

      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
