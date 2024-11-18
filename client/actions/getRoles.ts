export async function getRoles(token: string): Promise<any> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/users/roles`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return [];
  }
}
