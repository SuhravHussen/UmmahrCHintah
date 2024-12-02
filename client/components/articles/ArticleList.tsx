import { getArticles } from "@/actions/getArticles";
import React from "react";
import ArticleCard from "../common/article/Card";
import { PaginationComponent } from "../common/Pagination";

export default async function ArticleList({
  query,
  currentPage,
  sort,
}: {
  query: string;
  currentPage: number;
  sort: "recent" | "oldest" | "views";
}) {
  const data = await getArticles(query, currentPage, sort);

  return (
    <div className="flex flex-col gap-4">
      {data.data.length > 0 &&
        data.data.map((article) => (
          <ArticleCard query={query} key={article.id} article={article} />
        ))}
      {data.data.length === 0 && (
        <p className="text-center py-12">
          দুঃখিত, কোনও আর্টিকেল পাওয়া যায়নি।
        </p>
      )}

      {data.pagination.totalPage > 1 && (
        <div className="mt-8 mb-8">
          <PaginationComponent
            totalPage={data.pagination.totalPage}
            currentPage={currentPage}
            query={query}
            sort={sort}
          />
        </div>
      )}
    </div>
  );
}
