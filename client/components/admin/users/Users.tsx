import getToken from "@/actions/getAccessToken";
import { getUsers } from "@/actions/getUsers";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FetchData, usePagination } from "@/hooks/usePagination";

import { UsersTable } from "./UsersTable";
import { IDetailedUser } from "@/interfaces/User.interface";

export default function Users() {
  const fetchUsers: FetchData<IDetailedUser> = async (
    query,
    limit,
    page,
    extraParams: { [key: string]: any } = { roleId: "" }
  ) => {
    try {
      const token = await getToken();

      if (!token.accessToken) {
        console.error("Access token not found");
        return {
          data: [],
          totalPage: 0,
        };
      }
      const response = await getUsers(
        page,
        limit,
        token.accessToken,
        query,
        extraParams.roleId
      );

      if (response.hasOwnProperty("data")) {
        return {
          data: response.data,
          totalPage: response.pagination.totalPage,
        };
      } else {
        return { data: [], totalPage: 0 };
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        data: [],
        totalPage: 0,
      };
    }
  };

  const {
    data,
    loading,
    currentPage,
    updateQuery,
    goToPage,
    totalPage,
    updateExtraParams,
  } = usePagination<IDetailedUser>(fetchUsers, "", 10, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>
          Welcome to the users management section! As an admin or moderator, you
          can view, edit, and add articles. Additionally, admin, have the
          exclusive ability to delete articles.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4"></CardContent>

      <div className="w-[98%] mx-auto">
        <UsersTable
          users={data}
          setQuery={updateQuery}
          updateExtraParams={updateExtraParams}
          goToPage={goToPage}
          loading={loading}
          page={currentPage}
          totalPage={totalPage}
        />
      </div>
    </Card>
  );
}
