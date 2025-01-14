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
  const { user, error, isLoading } = useUser();

  const { toast } = useToast();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]  overflow-hidden">
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

  // if (!hasDashboardAccess(user)) {
  //   redirect("/");
  // }

  return (
    <div>
      {!hasDashboardAccess(user) && (
        <div className="bg-red-100 p-2 rounded-md shadow-md mt-10 ">
          <p className="text-sm font-semibold text-red-600">
            As a guest you only have read access
          </p>
        </div>
      )}
      {children}
    </div>
  );
}
