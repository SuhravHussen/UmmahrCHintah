"use client";

import RichTextEditor from "@/components/common/editor/TextEditor";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/common/DatePicker";
import { SearchableSelect } from "@/components/common/SearchableSelect";
import ArticlePage from "@/components/common/article/ArticlePage";
import KeywordSelector from "../../common/KeywordSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import htmlToRawString from "@/lib/htmlToRawString";
import { getAuthors } from "@/actions/getAuthors";
import { IAuthor } from "@/interfaces/Author.interface";
import useAsync from "@/hooks/useAsync";
import { addArticle } from "@/actions/addArticle";
import getToken from "@/actions/getAccessToken";

export default function AddArticle() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState<IAuthor>({
    name: "",
    id: "",
    image: "",
  });
  const [date, setDate] = useState<Date | string>(new Date());
  const [keywords, setKeywords] = useState<string[]>([]);
  const [originalPostLink, setOriginalPostLink] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Validation function
  const validateFields = () => {
    const fields = [
      { field: title, message: "Please fill in the title of the article." },
      { field: content, message: "Please fill in the content of the article." },
      {
        field: author.name,
        message: "Please select an author for the article.",
      },
    ];

    for (const { field, message } of fields) {
      if (!field) {
        toast({
          variant: "destructive",
          title: "Missing Field!",
          description: message,
          className: "mt-4",
        });
        return false;
      }
    }

    if (keywords.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing Field!",
        description: "Add at least one keyword.",
        className: "mt-4",
      });
      return false;
    }

    return true;
  };

  // Function to build request body
  const buildRequestBody = () => {
    const text = htmlToRawString(content);
    const isoDate = new Date(date).toISOString();

    return {
      title,
      originalPostLink,
      content: { text, richText: content },
      keywords,
      dateWritten: isoDate,
      authorId: author.id,
    };
  };

  // reset states
  const resetStates = () => {
    setContent("");
    setTitle("");
    setAuthor({ name: "", id: "", image: "" });
    setDate(new Date());
    setKeywords([]);
    setOriginalPostLink("");
  };

  const handleAddArticle = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();

    if (!validateFields()) return;

    const body = buildRequestBody();

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
      const res = await addArticle(body, token.accessToken as string);

      if ("statusCode" in res && res.statusCode === 401) {
        toast({
          title: "Sorry!",
          description: "Something went wrong! You may need to log in again.",
          className: "mt-4",
          variant: "destructive",
        });
        return;
      }

      if ("data" in res && "id" in res.data) {
        toast({
          title: "Success!",
          description: "Article added successfully.",
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
      resetStates();
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthors: () => Promise<IAuthor[]> = async () => {
    const { data } = await getAuthors(1, 100000000000);
    return data;
  };

  const { data: authorsList, execute } = useAsync<IAuthor[], []>(fetchAuthors);

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl text-center">Add Your Article</h1>
      <form className="mt-6" onSubmit={handleAddArticle}>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Original Post Link..."
            onChange={(e) => setOriginalPostLink(e.target.value)}
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

        <RichTextEditor onChange={(html) => setContent(html)} />

        <Button disabled={loading} type="submit" className="w-full my-6">
          {!loading ? "Add Article" : "Loading..."}
        </Button>

        <h1 className="text-center font-bold text-xl mt-6">OUTPUT :</h1>
        <ArticlePage
          title={title}
          keywords={keywords}
          richText={content}
          dateWritten={date as string}
          author={author.name}
        />
      </form>
    </div>
  );
}
