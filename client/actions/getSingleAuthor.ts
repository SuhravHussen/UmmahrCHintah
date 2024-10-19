import {
  EmptySingleAuthorResponse,
  GetSingleAuthorResponse,
} from "@/interfaces/Author.interface";
import { emptyAuthorResponse } from "@/lib/emptyresponse";

export async function getSingleAuthor(
  id: string
): Promise<GetSingleAuthorResponse | EmptySingleAuthorResponse> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/authors/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyAuthorResponse;
  }
}
