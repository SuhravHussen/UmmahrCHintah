import { convertToLocalBangladeshTime } from "@/lib/convertTime";
import React from "react";
import { CalendarIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import DisplayArticle from "./DisplayArticle";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Clock9, Feather } from "lucide-react";

import { secondaryFont } from "@/lib/fonts";
import Link from "next/link";

export default function ArticlePage({
  title,
  author,
  dateWritten,
  readingTime = "5 MIN",
  keywords,
  richText,
  originalPostLink,
}: {
  title: string;
  author: string;
  dateWritten: string;
  readingTime?: string;
  keywords: string[];
  richText: string;
  originalPostLink: string;
}) {
  return (
    <article className="mt-10">
      <Card className="p-2 md:p-4">
        <h1
          className={`text-center line-clamp-3 ${secondaryFont.className} text-2xl md:text-3xl`}
        >
          {title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-6 justify-center">
          <div className="flex items-center gap-2 justify-center">
            <Feather /> <p>{author}</p>
          </div>
          <div className="flex items-center  justify-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            <p>{convertToLocalBangladeshTime(dateWritten)}</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Clock9 /> <p>{readingTime.toUpperCase()}</p>
          </div>
          {originalPostLink && (
            <div className="flex items-center gap-2 justify-center">
              <ExternalLinkIcon />{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={originalPostLink}
              >
                Original Post Link
              </a>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center mt-6">
          {keywords.map((key) => (
            <Link href={`/articles?page=1&query=${key}`} key={key}>
              <div className="flex items-center gap-1">
                <p className="font-bold"># {key}</p>
              </div>
            </Link>
          ))}
        </div>

        <Separator className="my-8" />

        <DisplayArticle article={richText} />
      </Card>
    </article>
  );
}
