"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getRecentArticles(): Promise<any[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
