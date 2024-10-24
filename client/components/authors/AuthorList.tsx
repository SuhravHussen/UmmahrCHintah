import { getAuthors } from "@/actions/getAuthors";
import AuthorCard from "../common/author/AuthorCard";
import { PaginationComponent } from "../common/Pagination";

export default async function AuthorList({
  currentPage,
}: {
  currentPage: number;
}) {
  const data = await getAuthors(currentPage);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap  gap-2 mt-10 justify-between">
        {data.data.length > 0 &&
          data.data.map((author) => (
            <AuthorCard author={author} key={author.id} />
          ))}
      </div>

      {data.pagination.totalPage > 1 && (
        <div className="mt-8 mb-8">
          <PaginationComponent
            totalPage={data.pagination.totalPage}
            currentPage={currentPage}
            query={""}
            sort=""
          />
        </div>
      )}
    </div>
  );
}
