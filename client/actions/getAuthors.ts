"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAuthors(page: number): Promise<any[]> {
  console.log(page);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
