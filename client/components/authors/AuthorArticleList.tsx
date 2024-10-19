import React from "react";
import ArticleCard from "../common/article/Card";
import { getAuthorArticles } from "@/actions/getAuthorArticles";
import { PaginationComponent } from "../common/Pagination";

export default async function AuthorArticleList({
  currentPage,
  id,
}: {
  id: string;
  currentPage: number;
}) {
  const data = await getAuthorArticles(id, currentPage);

  return (
    <div className="flex flex-col gap-4">
      {data.data.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      {data.data.length === 0 && (
        <p className="text-center py-20 ">
          দুঃক্ষিত, কোনও আর্টিকেল পাওয়া যায়নি।
        </p>
      )}
      {data.pagination.totalPage > 1 && (
        <div className="mt-8 mb-8">
          <PaginationComponent
            totalPage={data.pagination.totalPage}
            currentPage={currentPage}
            query=""
          />
        </div>
      )}
    </div>
  );
}
