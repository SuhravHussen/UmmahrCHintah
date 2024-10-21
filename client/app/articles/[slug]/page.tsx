import { getSingleArticle } from "@/actions/getSingleArticle";
import updateTotalViews from "@/actions/updateTotalViews";
import ArticlePage from "@/components/common/article/ArticlePage";
import { IArticle } from "@/interfaces/Article.interface";

export default async function page({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
  };
}) {
  const id = searchParams.id || "";
  if (!id) {
    return (
      <div className="flex justify-center items-center p-10 min-h-[80vh]">
        <p className="font-bold text-2xl">দুঃখিত, আর্টিকেল পাওয়া যায়নি</p>
      </div>
    );
  }
  await updateTotalViews(id);

  const data = await getSingleArticle(id);
  const blog = data.data as IArticle;

  if (!blog || Object.keys(blog).length === 0) {
    return (
      <div className="flex justify-center items-center p-10 min-h-[80vh]">
        <p className="font-bold text-2xl">দুঃখিত, আর্টিকেল পাওয়া যায়নি</p>
      </div>
    );
  }

  return (
    <ArticlePage
      title={blog.title}
      richText={blog.content.richText}
      dateWritten={blog.dateWritten}
      author={blog.author.name}
      keywords={blog.keywords}
      readingTime={blog.readingTime}
      originalPostLink={blog.originalPostLink || ""}
    />
  );
}
