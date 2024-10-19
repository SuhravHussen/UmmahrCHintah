import { GetAllArticleResponse } from "@/interfaces/Article.interface";
import { emptyArticleListResponse } from "@/lib/emptyresponse";

export async function getPopularArticles(): Promise<GetAllArticleResponse> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/blogs?page=1&limit=4&sort=views`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyArticleListResponse;
  }
}
