"use server";

export async function deleteUser(token: string, userId: string): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return {};
  }
}
