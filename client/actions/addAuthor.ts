"use server";

import {
  EmptySingleAuthorResponse,
  GetSingleAuthorResponse,
  IAuthor,
} from "@/interfaces/Author.interface";
import { emptyAuthorResponse } from "@/lib/emptyresponse";

export async function addAuthor(
  data: Partial<IAuthor>,
  token: string
): Promise<GetSingleAuthorResponse | EmptySingleAuthorResponse> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const authorData = await response.json();

    return authorData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyAuthorResponse;
  }
}
