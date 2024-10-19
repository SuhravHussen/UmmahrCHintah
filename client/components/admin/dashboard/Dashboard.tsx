"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import InfoCard from "./Card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Welcome to the dashboard! This is your central hub for managing your
          account settings, accessing key features, and staying informed about
          the latest updates on our site
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <InfoCard title="Total articles" info="70" />
        <InfoCard title="Total authors" info="7" />
      </CardContent>

      <CardFooter>
        <Button>
          <a href="/api/auth/logout">Logout</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
