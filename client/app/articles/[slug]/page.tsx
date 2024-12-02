import { getSingleArticle } from "@/actions/getSingleArticle";
import updateTotalViews from "@/actions/updateTotalViews";
import ArticleCardSkeleton from "@/components/common/article/ArticleCardSkeleton";
import ArticlePage from "@/components/common/article/ArticlePage";
import RelatedArticles from "@/components/common/article/RelatedArticles";
import { IArticle } from "@/interfaces/Article.interface";
import { Suspense } from "react";
import HeadingImage from "../../../public/heading.png";
import highlightQueryMatches from "@/lib/highlightQueryMatches";

//@ts-ignore
import { findAll } from "highlight-words-core";

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
      images: [
        {
          url: "../../../public/heading.png",
          width: 800,
          height: 600,
          alt: blog.title,
          type: "image/png",
        },
      ],
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
      images: [HeadingImage],
    },
    category: "islam",
  };
}

export default async function page({
  searchParams,
}: {
  searchParams: {
    id: string | undefined;
    query: string | undefined;
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

  let content = blog.content.richText;

  if (searchParams.query) {
    const chunks = findAll({
      caseSensitive: false,
      searchWords: searchParams.query.split(" "),
      textToHighlight: content,
    });

    console.log(content.slice(3, 6));
    content = chunks
      .map((chunk: any) => {
        const { end, highlight, start } = chunk;
        const text = content.substr(start, end - start);
        if (highlight) {
          return `<span class="highlight">${text}</span>`;
        } else {
          return text;
        }
      })
      .join("");
  }

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
        richText={content}
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
