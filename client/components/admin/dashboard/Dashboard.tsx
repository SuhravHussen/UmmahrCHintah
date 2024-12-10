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
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap";
import getArticleCountsPerMonth from "@/actions/getArticleCountsPerMonth";
import { useDebouncedCallback } from "use-debounce";

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

  const fetchArticleCountsOfMonth = async (date = new Date()) => {
    try {
      let response = await getArticleCountsPerMonth(date);
      response = response.map((item: any) => ({
        date: new Date(item.date),
        weight: item.weight,
      }));

      return response;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return [];
    }
  };

  useEffect(() => {
    getTotalNumber();
  }, []);

  const [queryDate, setQueryDate] = React.useState(new Date());

  const { data: articleCounts, execute: getTotalArticleCounts } = useAsync<
    { date: Date; weight: number }[],
    [Date]
  >(fetchArticleCountsOfMonth);

  useEffect(() => {
    getTotalArticleCounts(queryDate);
  }, [queryDate]);

  useEffect(() => {
    console.log(articleCounts);
  }, [articleCounts]);

  const changeDate = useDebouncedCallback((date: Date) => {
    setQueryDate(date);
  }, 500);

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
      <div className="p-5 bg-background rounded-md shadow-md">
        <h2 className="text-lg font-semibold">Articles per month</h2>
        <p className="text-sm text-muted-foreground">
          This calendar shows the number of articles per month. The color
          indicates the number of articles, The brighter the color, the more
          articles.
        </p>
        <div className="mt-4">
          <CalendarHeatmap
            showOutsideDays={false}
            onMonthChange={(d) => changeDate(d)}
            variantClassnames={[
              "text-white  bg-green-900 ",
              "text-white  bg-green-700 ",
              "text-white  bg-green-600 ",
              "text-white  bg-green-500 ",
              "text-white  bg-green-400 ",
              "text-black  bg-green-300 ",
              "text-black  bg-green-200 ",
              "text-black bg-green-100 ",
            ]}
            weightedDates={articleCounts ?? []}
          />
        </div>
      </div>
      <CardFooter>
        <Button>
          <a href="/api/auth/logout">Logout</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
