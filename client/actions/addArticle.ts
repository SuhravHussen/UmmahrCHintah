"use server";

import {
  EmptySingleArticleResponse,
  IArticle,
} from "./../interfaces/Article.interface";
import { GetSingleArticleResponse } from "@/interfaces/Article.interface";
import { emptyArticleResponse } from "@/lib/emptyresponse";

export async function addArticle(
  data: Partial<IArticle>,
  token: string
): Promise<GetSingleArticleResponse | EmptySingleArticleResponse> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const articleData = await response.json();

    return articleData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyArticleResponse;
  }
}
