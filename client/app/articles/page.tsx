import SearchBar from "@/components/common/article/SearchBar";
import { Suspense } from "react";
import { primaryFont } from "@/lib/fonts";
import ArticleList from "@/components/articles/ArticleList";

import { SelectComponent } from "@/components/common/Select";
import ArticleCardSkeleton from "@/components/common/article/ArticleCardSkeleton";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: "recent" | "oldest" | "views";
  };
}) {
  const query = searchParams?.query || "";
  const sort = searchParams?.sort || "recent";
  const currentPage = Number(searchParams?.page) || 1;
  const sortings = [
    {
      label: "recent",
      value: "recent",
    },
    {
      label: "oldest",
      value: "oldest",
    },
    {
      label: "most viewed",
      value: "views",
    },
  ];

  // const perPage = [
  //   {
  //     label: "10 articles",
  //     value: "10",
  //   },
  //   {
  //     label: "15 articles",
  //     value: "15",
  //   },
  //   {
  //     label: "20 articles",
  //     value: "20",
  //   },
  //   {
  //     label: "25 articles",
  //     value: "25",
  //   },
  //   {
  //     label: "50 articles",
  //     value: "50",
  //   },
  // ];

  const ArticlesLoader = () => {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16">
      <h1 className={`${primaryFont.className} text-5xl text-center `}>
        আর্টিকেল সমুহ
      </h1>
      <div className="mt-8 mb-8">
        <SearchBar />

        <div className="flex flex-col md:flex-row justify-between mt-4 gap-2 md:gap-0">
          <SelectComponent
            items={sortings}
            placeholder="Sort"
            queryParam="sort"
          />

          {/* <SelectComponent
            items={perPage}
            placeholder="Select articles per page"
            queryParam="limit"
          /> */}
        </div>
      </div>

      <Suspense key={query + currentPage} fallback={<ArticlesLoader />}>
        <ArticleList query={query} currentPage={currentPage} sort={sort} />
      </Suspense>
    </div>
  );
}
