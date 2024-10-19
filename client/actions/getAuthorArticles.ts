"use server";

import { GetAllArticleResponse } from "@/interfaces/Article.interface";
import { emptyArticleListResponse } from "@/lib/emptyresponse";

export async function getAuthorArticles(
  id: string,
  page: number
): Promise<GetAllArticleResponse> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/blogs/author/${id}?page=${page}&limit=10`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyArticleListResponse;
  }
}
