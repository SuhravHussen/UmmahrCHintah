"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, SunMoon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the button
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant={"outline"}
      size="icon"
    >
      {theme === "light" ? <Moon size={23} /> : <SunMoon size={23} />}
    </Button>
  );
}
