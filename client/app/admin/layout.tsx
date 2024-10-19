"use client";

import { useToast } from "@/hooks/use-toast";

import hasDashboardAccess from "@/lib/hasDashboardaccess";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let { user, error, isLoading } = useUser();

  const { toast } = useToast();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh] w-[100vw] overflow-hidden">
        <p className="text-2xl font-bold">Loading.........</p>
      </div>
    );
  }

  if (error) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
    });
    redirect("/");
  }

  if (!user) {
    redirect("/");
  }

  if (!hasDashboardAccess(user)) {
    redirect("/");
  }

  return <div>{children}</div>;
}
