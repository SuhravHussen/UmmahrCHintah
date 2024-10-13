import React from "react";
import { Card } from "../../ui/card";

import userplaceholder from "../../../public/user-placeholder.png";
import ImageWithFallback from "../ImageWithFallback";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthorCard({ author }: any) {
  return (
    <Link href={`/author/articles/${author.id}}`}>
      <Card className="flex flex-col items-center p-4 border rounded-lg shadow-md w-40 h-[250px] gap-6 hover:bg-card-hover">
        <ImageWithFallback
          fallback={userplaceholder}
          src={userplaceholder}
          alt={author.name}
          objectFit="cover"
        />
        <p className="text-lg font-semibold text-center line-clamp-2">
          {author.name}
        </p>
      </Card>
    </Link>
  );
}
