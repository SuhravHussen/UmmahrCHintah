import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IArticle } from "@/interfaces/Article.interface";
import { Clock9, Eye, Feather } from "lucide-react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ArticleCard({ article }: { article: IArticle }) {
  return (
    <Link href={`/articles/${article.title}-${article.id}`}>
      <Card className="cursor-pointer hover:bg-card-hover">
        <CardHeader>
          <CardTitle className="truncate py-2">{article.title}</CardTitle>
          <CardDescription className="text-justify line-clamp-3">
            {article.content.text}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col items-start">
          <div className="flex gap-4 items-center">
            <p className="flex text-sm items-center gap-2">
              <Clock9 size={15} /> {article.readingTime}
            </p>
            <p className="flex text-sm items-center gap-2">
              <Eye size={15} /> {article.totalViews}
            </p>
          </div>
          <p className="flex text-sm items-center gap-2 mt-3">
            <Feather size={15} /> {article.author.name}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
