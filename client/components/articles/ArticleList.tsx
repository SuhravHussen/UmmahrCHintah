import { getArticles } from "@/actions/getArticles";
import React from "react";
import ArticleCard from "../common/article/Card";

export default async function ArticleList({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const data = await getArticles(query, currentPage);

  return (
    <div className="flex flex-col gap-4">
      {data.slice(0, 6).map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      {data.length === 0 && (
        <p className="text-center py-12">
          দুঃখিত, কোনও আর্টিকেল পাওয়া যায়নি।
        </p>
      )}
    </div>
  );
}
