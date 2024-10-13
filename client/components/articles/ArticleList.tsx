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
    </div>
  );
}
