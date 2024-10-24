import { GetAllArticleResponse } from "@/interfaces/Article.interface";
import { emptyArticleListResponse } from "@/lib/emptyresponse";

export async function getRelatedArticles(
  id: string
): Promise<Partial<GetAllArticleResponse>> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/blogs/relatedBlogs?id=${id}`,
      { cache: "no-store" }
    );

    const data = await response.json();
    console.log("datra is", data);
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyArticleListResponse;
  }
}
