"use client";

import getToken from "@/actions/getAccessToken";
import { getAuthors } from "@/actions/getAuthors";
import { getSingleArticle } from "@/actions/getSingleArticle";
import { updateArticle } from "@/actions/updateArticle";
import { DatePicker } from "@/components/common/DatePicker";
import RichTextEditor from "@/components/common/editor/TextEditor";
import KeywordSelector from "@/components/common/KeywordSelector";
import { SearchableSelect } from "@/components/common/SearchableSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import useAsync from "@/hooks/useAsync";
import { IArticle } from "@/interfaces/Article.interface";
import { IAuthor } from "@/interfaces/Author.interface";
import htmlToRawString from "@/lib/htmlToRawString";
import checkRole from "@/lib/roleCheck";
import { validateArticleBody } from "@/lib/validateBody";
import { useUser } from "@auth0/nextjs-auth0/client";

import { FormEvent, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const id = params.id;

  const [article, setArticle] = useState<IArticle>({
    title: "",
    content: {
      text: "",
      richText: " ",
    },
    originalPostLink: "",
    dateWritten: "",
    author: {
      name: "",
      id: "",
      image: "",
    },
    authorId: "",
    totalViews: 0,
    readingTime: "",
    keywords: [] as string[],
    id: "",
  });
  const [author, setAuthor] = useState<IAuthor>({
    id: "",
    image: "",
    name: "",
  });

  const [date, setDate] = useState(new Date());
  const [keywords, setKeywords] = useState([] as string[]);
  const [articleUpdating, setArticleUpdating] = useState(false);
  const { toast } = useToast();

  //fetchAuthors
  const fetchAuthors: () => Promise<IAuthor[]> = async () => {
    const { data } = await getAuthors(1, 100000000000);
    return data;
  };
  const { data: authorsList, execute: getAllAuthors } = useAsync<IAuthor[], []>(
    fetchAuthors
  );

  // fetch article
  const fetchArticle: () => Promise<IArticle | {}> = async () => {
    const { data } = await getSingleArticle(id);
    return data;
  };
  const {
    loading: articleDataLoading,
    data: articleData,
    execute: getSingleArticleData,
  } = useAsync<IArticle | {}, []>(fetchArticle);

  useEffect(() => {
    if (articleData && "id" in articleData) {
      setArticle(articleData);
      setAuthor(articleData.author);
      setDate(new Date(articleData.dateWritten));
      setKeywords(articleData.keywords);
    }
  }, [articleData]);

  useEffect(() => {
    getAllAuthors();
    getSingleArticleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user } = useUser();

  const handleArticleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isAdmin = checkRole(user, "admin");
    const isModerator = checkRole(user, "moderator");
    if (!isAdmin && !isModerator) {
      toast({
        title: "Sorry!",
        description: "You don't have access to update article",
        className: "mt-4",
        variant: "destructive",
      });
      return;
    }

    setArticleUpdating(true);
    const body = {
      title: article.title,
      content: {
        text: htmlToRawString(article.content.richText),
        richText: article.content.richText,
      },
      dateWritten: new Date(date).toISOString(),
      keywords,
      authorId: author.id,
      originalPostLink: article.originalPostLink,
    };

    const isValidBody = validateArticleBody(body);

    if (!isValidBody) {
      toast({
        title: "Some property missing",
        description: "Make sure u filled all the properties",
        variant: "destructive",
      });
      return;
    }

    const token = await getToken();

    if (!token.accessToken) {
      toast({
        title: "Sorry!",
        description: "Something went wrong! You may need to log in again.",
        className: "mt-4",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await updateArticle(body, token.accessToken, article.id);
      console.log(body, res);
      if ("statusCode" in res && res.statusCode === 401) {
        toast({
          title: "Sorry!",
          description: "Something went wrong! You may need to log in again.",
          className: "mt-4",
          variant: "destructive",
        });
        return;
      }

      if ("clientMessage" in res) {
        toast({
          title: "Sorry!",
          description: res.clientMessage as string,
          className: "mt-4",
          variant: "destructive",
        });
        return;
      }

      if ("data" in res && "id" in res.data) {
        toast({
          title: "Success!",
          description: "Article updated successfully.",
          className: "mt-4",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Sorry!",
        description: "Something went wrong!",
        className: "mt-4",
        variant: "destructive",
      });
    } finally {
      setArticleUpdating(false);
    }
  };

  return (
    <div className="mt-16 mb-8">
      <h1 className="font-bold text-center text-2xl">Edit Article</h1>

      <form className="mt-6" onSubmit={handleArticleUpdate}>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title..."
            value={article.title}
            onChange={(e) =>
              setArticle({
                ...article,
                title: e.target.value,
              })
            }
          />
          <Input
            value={article.originalPostLink}
            placeholder="Original Post Link..."
            onChange={(e) =>
              setArticle({
                ...article,
                originalPostLink: e.target.value,
              })
            }
          />
          <div className="flex flex-col md:flex-row w-full gap-2">
            <SearchableSelect
              authors={authorsList || []}
              selectedAuthor={author}
              setSelectedAuthor={setAuthor}
            />

            <DatePicker date={date} setDate={setDate} />
          </div>

          <KeywordSelector keywords={keywords} setKeywords={setKeywords} />
        </div>

        <RichTextEditor
          onChange={(v) =>
            setArticle({
              ...article,
              content: {
                ...article.content,
                richText: v,
              },
            })
          }
          content={article.content.richText}
        />

        <Button
          className="w-full mt-8"
          disabled={articleDataLoading || articleUpdating}
        >
          Update
        </Button>
      </form>
    </div>
  );
}
