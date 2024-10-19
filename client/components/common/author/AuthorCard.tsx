import React from "react";
import { Card } from "../../ui/card";

import userplaceholder from "../../../public/user-placeholder.png";
import ImageWithFallback from "../ImageWithFallback";
import Link from "next/link";
import { IAuthor } from "@/interfaces/Author.interface";

export default function AuthorCard({ author }: { author: IAuthor }) {
  return (
    <Link href={`/authors/articles/${author.name}-${author.id}`}>
      <Card className="flex flex-col items-center p-4 border rounded-lg shadow-md w-40 h-[250px] gap-6 hover:bg-card-hover">
        <ImageWithFallback
          fallback={userplaceholder}
          src={author.image ? author.image : userplaceholder}
          alt={author.name}
          objectFit="cover"
          width={150}
          height={150}
          className="rounded-lg"
        />
        <div className=" h-full flex justify-center items-center">
          <p className="text-lg font-semibold text-center line-clamp-2 ">
            {author.name}
          </p>
        </div>
      </Card>
    </Link>
  );
}
