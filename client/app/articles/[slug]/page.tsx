import { getSingleArticle } from "@/actions/getSingleArticle";
import ArticlePage from "@/components/common/article/ArticlePage";
import { IArticle } from "@/interfaces/Article.interface";

export default async function page({ params }: { params: { slug: string } }) {
  const id = params.slug.split("-").pop();

  if (!id) {
    return <p>Sorry Article Id not available</p>;
  }

  const data = await getSingleArticle(id);
  const blog = data.data as IArticle;

  if (!blog || Object.keys(blog).length === 0) {
    return <p>Sorry Article is not available</p>;
  }

  return (
    <ArticlePage
      title={blog.title}
      richText={blog.content.richText}
      dateWritten={blog.dateWritten}
      author={blog.author.name}
      keywords={blog.keywords}
      readingTime={blog.readingTime}
    />
  );
}
