import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { FetchData, usePagination } from "@/hooks/usePagination";
import { AuthorsTable } from "./AuthorsTable";
import AddAuthor from "./AddAuthor";
import { IAuthor } from "@/interfaces/Author.interface";
import { getAuthors } from "@/actions/getAuthors";

export default function Authors() {
  const fetchAuthors: FetchData<IAuthor> = async (_, limit, page) => {
    try {
      const data = await getAuthors(page, limit);
      return {
        data: data.data,
        totalPage: data.pagination.totalPage,
      };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return {
        data: [],
        totalPage: 0,
      };
    }
  };

  const {
    data,
    loading,
    currentPage,
    updatePerPage,
    goToPage,
    totalPage,
    refreshData,
  } = usePagination<IAuthor>(fetchAuthors);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authors</CardTitle>
        <CardDescription>
          Welcome to the authors management section! As an admin or moderator,
          you can view, edit, and add authors. Additionally, admin, have the
          exclusive ability to delete authors.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4"></CardContent>
      <div className="w-[98%] mx-auto">
        <AuthorsTable
          authors={data}
          SetPerPage={updatePerPage}
          goToPage={goToPage}
          loading={loading}
          page={currentPage}
          totalPage={totalPage}
        />
      </div>

      <AddAuthor refreshData={refreshData} />
    </Card>
  );
}
