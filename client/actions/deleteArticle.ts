"use server";

export async function deleteArticle(
  token: string,
  id: string
): Promise<{ message: string; success: boolean }> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return {
        message: "deleted successfully",
        success: true,
      };
    } else {
      const data = await response.json();
      return {
        message: data.clientMessage,
        success: false,
      };
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return {
      message: "sorry! something wrong with deleting the article",
      success: false,
    };
  }
}
