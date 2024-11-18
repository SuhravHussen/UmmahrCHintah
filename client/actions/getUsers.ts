import { PaginationInfo } from "@/interfaces/Common.interface";
import { PaginationLinks } from "@/interfaces/Common.interface";
import { getAllUsersResponse } from "@/interfaces/User.interface";

export async function getUsers(
  page = 0,
  perPage = 10,
  token: string,
  email?: string,
  roleId?: string
): Promise<
  | getAllUsersResponse
  | {
      data: [];
      pagination: PaginationInfo;
      _links: PaginationLinks;
    }
> {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("perPage", perPage.toString());
    if (roleId && roleId !== "all") queryParams.append("roleId", roleId);
    if (email) queryParams.append("email", email);

    const response = await fetch(
      `${process.env.API_BASE_URL}/users?${queryParams}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 404) {
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return {
      data: [],
      pagination: {
        page: 0,
        perPage: 0,
        totalPage: 0,
      },
      _links: {
        self: "",
        next: "",
        prev: "",
      },
    };
  }
}
