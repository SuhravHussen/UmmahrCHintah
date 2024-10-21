import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IArticle } from "@/interfaces/Article.interface";
import { convertToLocalBangladeshTime } from "@/lib/convertTime";
import convertToSlug from "@/lib/convertToSlug";
import { CalendarIcon, Eye } from "lucide-react";
import Link from "next/link";
import { GiFeather } from "react-icons/gi";
import { IoMdBook } from "react-icons/io";

export default function ArticleCard({ article }: { article: IArticle }) {
  return (
    <Link href={`/articles/${convertToSlug(article.title)}?id=${article.id}`}>
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
              <IoMdBook size={18} /> {article.readingTime}
            </p>
            <p className="flex text-sm items-center gap-2">
              <Eye size={15} /> {article.totalViews}
            </p>
          </div>
          <div className="flex text-sm items-center gap-2 mt-3 justify-between  w-full">
            <div className="flex text-sm items-center gap-2 justify-center">
              <GiFeather size={16} /> {article.author.name}
            </div>
            <div className="flex items-center  justify-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <p>{convertToLocalBangladeshTime(article.dateWritten)}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
