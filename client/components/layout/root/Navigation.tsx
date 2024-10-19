"use client";

import ThemeToggle from "@/components/toggle-theme";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProfileDropDown } from "./ProfileDropDown";

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between mt-2 md:mt-6">
      <div className="flex gap-4 md:gap-6 sm:text-lg md:text-2xl  font-medium">
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
        {user ? (
          <ProfileDropDown />
        ) : (
          <Link href="/api/auth/login" className={`hover:link-active`}>
            Login
          </Link>
        )}
      </div>

      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
