import { GetAllAuthorsResponse } from "@/interfaces/Author.interface";
import { emptyAuthorListResponse } from "@/lib/emptyresponse";

export async function getAuthors(
  page: number,
  limit: number = 10
): Promise<GetAllAuthorsResponse> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/authors?page=${page}&limit=${limit}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyAuthorListResponse;
  }
}
