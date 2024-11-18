"use client";

import * as React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  GoToPageFunction,
  UpdateExtraParamsFunction,
  UpdateQueryFunction,
} from "@/hooks/usePagination";
import { deleteArticle } from "@/actions/deleteArticle";
import getToken from "@/actions/getAccessToken";
import { toast } from "@/hooks/use-toast";
import { getRoles } from "@/actions/getRoles";
import { useDebouncedCallback } from "use-debounce";
import { addRole } from "@/actions/addRole";
import { deleteRole } from "@/actions/deleteRole";
import { deleteUser } from "@/actions/deleteUser";
import { IDetailedUser, UserRole } from "@/interfaces/User.interface";

export const columns: ColumnDef<IDetailedUser>[] = [
  {
    accessorKey: "email",
    header: () => {
      return <div>Email</div>;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "Name",
    header: () => <div className="text-right">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.original.nickname}</div>
      );
    },
  },
  {
    accessorKey: "Role",
    header: () => <div className="text-right">Role</div>,
    cell: ({ row }) => {
      const roles = row.original.roles.map((role: UserRole) => role.name);

      return <div className="text-right font-medium">{roles.join(", ")}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row, table }) => {
      const [dropdownOpen, setDropDownOpen] = React.useState(false);
      const [adminDialogOpen, setAdminDialogOpen] = React.useState(false);
      const [moderatorDialogOpen, setModeratorDialogOpen] =
        React.useState(false);
      const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

      const isAdmin = row.original.roles.some(
        (role: { name: string }) => role.name.trim() === "admin"
      );
      const isModerator = row.original.roles.some(
        (role: { name: string }) => role.name.trim() === "moderator"
      );

      const handleDeleteUser = async (id: string) => {
        const token = await getToken();

        if (!token.accessToken) {
          toast({
            title: "Sorry!",
            description: "Something went wrong! You may need to log in again.",
            className: "mt-4",
            variant: "destructive",
          });
          return;
        }

        try {
          const res = await deleteUser(token.accessToken, id);

          if (res.hasOwnProperty("statusCode")) {
            toast({
              title: "Sorry!",
              description: "Something went wrong! ",
              className: "mt-4",
              variant: "destructive",
            });
            return;
          } else {
            toast({
              title: "success",
              description: "user deleted",
              className: "mt-4",
            });

            // @ts-ignore
            table.options.meta?.removeRow?.(id);
          }
        } catch (e) {
          console.log(e);
          toast({
            title: "Sorry!",
            description: "something went wrong",
            className: "mt-4",
            variant: "destructive",
          });
        } finally {
          setDropDownOpen(false);
        }
      };

      const handleAddRole = async (userId: string, roleName: string) => {
        try {
          const token = await getToken();

          if (!token.accessToken) {
            toast({
              title: "Sorry!",
              description:
                "Something went wrong! You may need to log in again.",
              className: "mt-4",
              variant: "destructive",
            });
            return;
          }

          const roles = await getRoles(token.accessToken);

          const role = roles.find(
            (r: UserRole) => r.name.trim() === roleName.trim()
          );

          if (!role.hasOwnProperty("id")) {
            toast({
              title: "Sorry!",
              description: "Something went wrong! ",
              className: "mt-4",
              variant: "destructive",
            });
            return;
          }

          const roleId = role.id;

          const res = await addRole(roleId, token.accessToken, userId);

          if (res.hasOwnProperty("statusCode")) {
            toast({
              title: "Sorry!",
              description: "Something went wrong! ",
              className: "mt-4",
              variant: "destructive",
            });
            return;
          } else {
            toast({
              title: "success",
              description: "role added",
              className: "mt-4",
            });

            row.original.roles.push({
              id: roleId,
              name: role.name,
            });
            // @ts-ignore
            table.options.meta?.updateRoles(userId, row.original.roles);
          }
        } catch (e) {
          console.log(e);
          toast({
            title: "Sorry!",
            description: "something went wrong",
            className: "mt-4",
            variant: "destructive",
          });
        } finally {
          setAdminDialogOpen(false);
          setDropDownOpen(false);
        }
      };

      const handleDeleteRole = async (userId: string, roleName: string) => {
        try {
          const token = await getToken();

          if (!token.accessToken) {
            toast({
              title: "Sorry!",
              description:
                "Something went wrong! You may need to log in again.",
              className: "mt-4",
              variant: "destructive",
            });
            return;
          }

          const roles = await getRoles(token.accessToken);

          const role = roles.find(
            (r: UserRole) => r.name.trim() === roleName.trim()
          );

          if (!role.hasOwnProperty("id")) {
            toast({
              title: "Sorry!",
              description: "Something went wrong! ",
              className: "mt-4",
              variant: "destructive",
            });
            return;
          }

          const roleId = role.id;

          const res = await deleteRole(roleId, token.accessToken, userId);

          if (res.hasOwnProperty("statusCode")) {
            toast({
              title: "Sorry!",
              description: "Something went wrong! ",
              className: "mt-4",
              variant: "destructive",
            });
            return;
          } else {
            toast({
              title: "success",
              description: "role deleted",
              className: "mt-4",
            });

            const newRoles = row.original.roles.filter(
              (role: { id: string }) => role.id !== roleId
            );
            // @ts-ignore
            table.options.meta?.updateRoles(userId, newRoles);
          }
        } catch (e) {
          toast({
            title: "Sorry!",
            description: "something went wrong",
            className: "mt-4",
            variant: "destructive",
          });
        } finally {
          setAdminDialogOpen(false);
          setDropDownOpen(false);
        }
      };

      return (
        <div>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropDownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Admin Dialog */}
              <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
                <div
                  className={`px-2 rounded cursor-pointer my-2 ${
                    isAdmin ? "bg-red-600" : ""
                  }`}
                >
                  <DialogTrigger asChild>
                    <p>{isAdmin ? "Remove from admin" : "Make admin"}</p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="p-6">
                        Do you really want to{" "}
                        {isAdmin ? "remove the admin role" : "make them admin"}?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() =>
                            isAdmin
                              ? handleDeleteRole(row.original.user_id, "admin")
                              : handleAddRole(row.original.user_id, "admin")
                          }
                          variant="outline"
                        >
                          Confirm
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>

              {/* Moderator Dialog */}
              <Dialog
                open={moderatorDialogOpen}
                onOpenChange={setModeratorDialogOpen}
              >
                <div
                  className={`px-2 rounded cursor-pointer my-2 ${
                    isModerator ? "bg-red-600" : ""
                  }`}
                >
                  <DialogTrigger asChild>
                    <p>
                      {isModerator ? "Remove from moderator" : "Make Moderator"}
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="p-6">
                        Do you really want to{" "}
                        {isModerator
                          ? "remove the moderator role"
                          : "make them moderator"}
                        ?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() => {
                            isModerator
                              ? handleDeleteRole(
                                  row.original.user_id,
                                  "moderator"
                                )
                              : handleAddRole(
                                  row.original.user_id,
                                  "moderator"
                                );
                          }}
                          variant="outline"
                        >
                          Confirm
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>

              {/* Delete Dialog */}
              <Dialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
              >
                <div className="px-2 bg-red-600 rounded cursor-pointer">
                  <DialogTrigger asChild>
                    <p>Delete</p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="p-6 ">
                        Do you really want to delete the user -
                        {row.original.email}?
                      </DialogTitle>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          onClick={() => handleDeleteUser(row.original.user_id)}
                          variant="outline"
                        >
                          Confirm
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function UsersTable({
  users,
  page,
  goToPage,
  updateExtraParams,
  setQuery,
  loading,
  totalPage,
}: {
  users: IDetailedUser[];
  loading: boolean;
  page: number;
  goToPage: GoToPageFunction;
  setQuery: UpdateQueryFunction;
  updateExtraParams: UpdateExtraParamsFunction;
  totalPage: number;
}) {
  const [data, setData] = React.useState(users);
  const [roles, setRoles] = React.useState<UserRole[]>([]);
  const fetchRoles = async () => {
    try {
      const token = await getToken();

      if (!token.accessToken) {
        console.error("Access token not found");
        return;
      }

      const response = await getRoles(token.accessToken);
      setRoles(response);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  React.useEffect(() => {
    setData(users);
  }, [users]);

  React.useEffect(() => {
    fetchRoles();
  }, []);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {},
    meta: {
      removeRow: (id: string) => {
        setData((prev) => prev.filter((prv) => prv.user_id !== id));
      },

      updateRoles: (
        id: string,
        newRoles: Array<{ id: string; name: string }>
      ) => {
        setData((prev) =>
          prev.map((row) =>
            row.user_id === id ? { ...row, roles: newRoles } : row
          )
        );
      },
    },
  });

  const rows = table.getRowModel().rows;
  const hasRows = rows?.length > 0;

  const handleQuery = useDebouncedCallback((v) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    if (isValidEmail || v === "") {
      setQuery(v);
    }
  }, 500);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          type="email"
          placeholder="Search emails..."
          onChange={(event) => handleQuery(event.target.value)}
          className="max-w-sm"
        />

        <div className="ml-auto">
          <Select onValueChange={(v) => updateExtraParams({ roleId: v })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"all"}>All</SelectItem>
                {roles?.map((role: UserRole) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!loading ? (
              hasRows ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page - 1)}
            disabled={page === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPage - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
