import { getSingleArticle } from "@/actions/getSingleArticle";
import updateTotalViews from "@/actions/updateTotalViews";
import ArticleCardSkeleton from "@/components/common/article/ArticleCardSkeleton";
import ArticlePage from "@/components/common/article/ArticlePage";
import RelatedArticles from "@/components/common/article/RelatedArticles";
import { IArticle } from "@/interfaces/Article.interface";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
  };
}) {
  const id = searchParams.id || "";

  const data = await getSingleArticle(id);

  const blog = data.data as IArticle;

  // return a dynamic title
  return {
    title: blog.title,
    description: blog.content.text.substring(0, 29) + "...",
    openGraph: {
      title: blog.title,
      description: blog.content.text.substring(0, 29) + "...",
      url: data._links.self,
      siteName: "Ummar Chintah",
      locale: "en_US",
      type: "website",
      publishedTime: new Date(blog.dateWritten),
      authors: [blog.author.name],
    },
    robots: {
      index: true,
      follow: false,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.content.text.substring(0, 29) + "...",
    },
    category: "islam",
  };
}

export default async function page({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
  };
}) {
  const ArticlesLoader = () => {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <ArticleCardSkeleton key={index} />
        ))}
      </div>
    );
  };

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
    <>
      <ArticlePage
        title={blog.title}
        richText={blog.content.richText}
        dateWritten={blog.dateWritten}
        author={blog.author.name}
        keywords={blog.keywords}
        readingTime={blog.readingTime}
        originalPostLink={blog.originalPostLink || ""}
      />
      <Suspense fallback={<ArticlesLoader />}>
        <RelatedArticles id={blog.id} />
      </Suspense>
    </>
  );
}
