"use server";

export async function addRole(
  roleId: string,
  token: string,
  userId: string
): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}/users/assign-roles/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roleIds: [roleId],
        }),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return {};
  }
}
