import AuthorArticleList from "@/components/authors/AuthorArticleList";
import ArticleCardSkeleton from "@/components/common/article/ArticleCardSkeleton";
import { primaryFont } from "@/lib/fonts";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function page({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams?: {
    page?: string;
  };
}) {
  const param = params.id.split("-");

  const id = param.pop() || " ";
  const name = param.pop() || "";

  const currentPage = Number(searchParams?.page) || 1;

  const ArticlesLoader = () => {
    return (
      <div className="flex flex-col gap-4 mt-8">
        {Array.from({ length: 5 }, (_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16">
      <h1 className={`${primaryFont.className} text-5xl text-center `}>
        {name.replace(/%20/g, " ")} এর আর্টিকেল সমুহ
      </h1>
      <Suspense key={currentPage} fallback={<ArticlesLoader />}>
        <div className="mt-8 mb-8">
          <div className="flex flex-col gap-4">
            <AuthorArticleList id={id} currentPage={currentPage} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
