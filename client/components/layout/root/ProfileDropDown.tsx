"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import hasDashboardAccess from "@/lib/hasDashboardaccess";
import Link from "next/link";

export function ProfileDropDown() {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p className="sm:text-lg md:text-2xl cursor-pointer">Profile</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <p className="cursor-pointer">Profile</p>
          </DropdownMenuItem>

          {hasDashboardAccess(user) && (
            <DropdownMenuItem>
              <Link href={"/admin"} className="cursor-pointer">
                Admin
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <a href="/api/auth/logout">Logout</a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
