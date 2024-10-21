"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect } from "react";
import InfoCard from "./Card";
import { Button } from "@/components/ui/button";
import getTotalCounts from "@/actions/getTotalCounts";
import useAsync from "@/hooks/useAsync";

export default function Dashboard() {
  const getCounts: () => Promise<{
    totalBlogs: number;
    totalAuthors: number;
  }> = async () => {
    return await getTotalCounts();
  };
  const {
    data = {
      totalBlogs: 0,
      totalAuthors: 0,
    },
    execute: getTotalNumber,
  } = useAsync<
    {
      totalBlogs: number;
      totalAuthors: number;
    },
    []
  >(getCounts);

  useEffect(() => {
    getTotalNumber();
  }, []);

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
        <InfoCard
          title="Total articles"
          info={`${data ? data.totalBlogs : 0} articles`}
        />
        <InfoCard
          title="Total authors"
          info={`${data ? data.totalAuthors : 0} authors`}
        />
      </CardContent>

      <CardFooter>
        <Button>
          <a href="/api/auth/logout">Logout</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
