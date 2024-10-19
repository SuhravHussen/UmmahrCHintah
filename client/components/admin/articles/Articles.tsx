import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArticlesTable } from "./ArticlesTable";
import { FetchData, usePagination } from "@/hooks/usePagination";
import { getArticles } from "@/actions/getArticles";
import { IArticle } from "@/interfaces/Article.interface";

export default function Articles() {
  const fetchBlogs: FetchData<IArticle> = async (query, limit, page) => {
    try {
      const response = await getArticles(query, page, "recent", limit);
      return { data: response.data, totalPage: response.pagination.totalPage };
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
    updateQuery,
    updatePerPage,
    goToPage,
    totalPage,
  } = usePagination<IArticle>(fetchBlogs);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles</CardTitle>
        <CardDescription>
          Welcome to the articles management section! As an admin or moderator,
          you can view, edit, and add articles. Additionally, admin, have the
          exclusive ability to delete articles.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4"></CardContent>

      <div className="w-[98%] mx-auto">
        <ArticlesTable
          articles={data}
          setQuery={updateQuery}
          SetPerPage={updatePerPage}
          goToPage={goToPage}
          loading={loading}
          page={currentPage}
          totalPage={totalPage}
        />
      </div>
    </Card>
  );
}
