"use server";

export async function deleteAuthor(
  token: string,
  id: string
): Promise<{ message: string; success: boolean }> {
  console.log(id);
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/authors/${id}`, {
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
      console.log(data);
      return {
        message: data.clientMessage,
        success: false,
      };
    }
  } catch (error) {
    console.error("There was a problem with the deleting", error);
    return {
      message: "sorry! something wrong with deleting the author",
      success: false,
    };
  }
}
