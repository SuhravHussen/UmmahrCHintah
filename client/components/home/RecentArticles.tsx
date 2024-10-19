import { secondaryFont } from "@/lib/fonts";
import { Feather } from "lucide-react";
import ArticleCard from "../common/article/Card";
import { getRecentArticles } from "@/actions/getRecenetArticles";

export default async function RecentArticles() {
  const data = await getRecentArticles();

  return (
    <div className="mt-8">
      <h1
        className={`${secondaryFont.className} text-xl md:text-2xl flex gap-2 items-center`}
      >
        সম্প্রতি প্রকাশিত <Feather />
      </h1>
      <div className="flex flex-col gap-4 mt-4">
        {data.data.length > 0 &&
          data.data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}

        {data.data.length === 0 && (
          <p className="text-center p-16">
            দুঃখিত, সম্প্রতি প্রকাশিত নিবন্ধগুলো খুঁজে পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
}
