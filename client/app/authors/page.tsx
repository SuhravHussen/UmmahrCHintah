import AuthorList from "@/components/authors/AuthorList";
import AuthorCardSkeleton from "@/components/common/author/AuthorCardSkeleton";
import { PaginationComponent } from "@/components/common/Pagination";
import { primaryFont } from "@/lib/fonts";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const totalPage = 100;

  const AuthorsLoader = () => {
    return (
      <div className="flex flex-wrap gap-2 mt-10 justify-center">
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

        {totalPage > 1 && (
          <div className="mt-8 mb-8">
            <PaginationComponent
              totalPage={100}
              currentPage={currentPage}
              query={""}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}
