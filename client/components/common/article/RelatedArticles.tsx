import { getRelatedArticles } from "@/actions/getRelatedArticles";
import { secondaryFont } from "@/lib/fonts";
import { GiFeather } from "react-icons/gi";
import ArticleCard from "./Card";

export default async function RelatedArticles({ id }: { id: string }) {
  const relatedArticlesList = await getRelatedArticles(id);
  return (
    <div className="my-8">
      <h1
        className={`${secondaryFont.className} text-xl md:text-2xl flex gap-2 items-center`}
      >
        <GiFeather size={20} /> আরো পড়ুন
      </h1>

      <div className="flex flex-col gap-4 mt-4">
        {relatedArticlesList.data?.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  );
}
