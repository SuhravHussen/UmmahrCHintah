import {
  EmptySingleArticleResponse,
  GetSingleArticleResponse,
} from "@/interfaces/Article.interface";
import { emptyArticleResponse } from "@/lib/emptyresponse";

export async function getSingleArticle(
  id: string
): Promise<GetSingleArticleResponse | EmptySingleArticleResponse> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/blogs/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyArticleResponse;
  }
}
