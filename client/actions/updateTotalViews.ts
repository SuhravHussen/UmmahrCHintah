"use server";

import { emptyArticleResponse } from "@/lib/emptyresponse";

const updateTotalViews = async (id: string) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/blogs/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const articleData = await response.json();

    return articleData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return emptyArticleResponse;
  }
};

export default updateTotalViews;
