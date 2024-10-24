import { convertToLocalBangladeshTime } from "@/lib/convertTime";
import React from "react";
import { CalendarIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import DisplayArticle from "./DisplayArticle";
import { Separator } from "@/components/ui/separator";
import { GiFeather } from "react-icons/gi";
import { secondaryFont } from "@/lib/fonts";
import Link from "next/link";
import { IoMdBook } from "react-icons/io";
import { LiaSlackHash } from "react-icons/lia";

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
    <>
      <article className="mt-10">
        {/* <Card className="p-2 md:p-4"> */}
        <h1
          className={`text-center line-clamp-3 ${secondaryFont.className} text-2xl md:text-3xl`}
        >
          {title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-6 justify-center">
          <div className="flex items-center gap-2 justify-center">
            <GiFeather size={18} /> <p>{author}</p>
          </div>
          <div className="flex items-center  justify-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            <p>{convertToLocalBangladeshTime(dateWritten)}</p>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <IoMdBook size={22} /> <p>{readingTime.toUpperCase()}</p>
          </div>
          {originalPostLink && (
            <div className="flex items-center gap-2 justify-center">
              <ExternalLinkIcon className="h-5 w-5" />
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
              <div className="flex items-center gap-1 justify-center">
                <LiaSlackHash className="mb-[0.5px]" /> <p>{key}</p>
              </div>
            </Link>
          ))}
        </div>
        <Separator className="my-6" />

        <DisplayArticle article={richText} />
        {/* </Card> */}
      </article>

      <div className="my-6">
        <h2 className="flex gap-4 text-2xl   items-center my-4 font-bold">
          <GiFeather size={18} /> লিখেছেন{" "}
        </h2>
        <Separator />
        <p className="my-4 text-2xl ">{author}</p>
      </div>
    </>
  );
}
