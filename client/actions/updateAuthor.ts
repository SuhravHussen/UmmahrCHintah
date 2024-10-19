"use server";

import {
  EmptySingleAuthorResponse,
  GetSingleAuthorResponse,
  IAuthor,
} from "@/interfaces/Author.interface";
import { emptyAuthorResponse } from "@/lib/emptyresponse";

export async function updateAuthor(
  data: Partial<IAuthor>,
  token: string,
  id: string
): Promise<GetSingleAuthorResponse | EmptySingleAuthorResponse> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/authors/${id}`, {
      method: "PUT",
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
    return emptyAuthorResponse;
  }
}
