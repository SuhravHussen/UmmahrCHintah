import AuthorList from "@/components/authors/AuthorList";
import AuthorCardSkeleton from "@/components/common/author/AuthorCardSkeleton";

import { primaryFont } from "@/lib/fonts";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const AuthorsLoader = () => {
    return (
      <div className="flex flex-wrap gap-2 mt-10 justify-between">
        {Array.from({ length: 5 }, (_, index) => (
          <AuthorCardSkeleton key={index} />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-16">
      <h1 className={`${primaryFont.className} text-5xl text-center `}>
        লেখক সমুহ
      </h1>

      <Suspense key={currentPage} fallback={<AuthorsLoader />}>
        <AuthorList currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
