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
  DropdownMenuItem,
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
import Link from "next/link";
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
  UpdatePerPageFunction,
  UpdateQueryFunction,
} from "@/hooks/usePagination";
import { IArticle } from "@/interfaces/Article.interface";
import { deleteArticle } from "@/actions/deleteArticle";
import getToken from "@/actions/getAccessToken";
import { toast } from "@/hooks/use-toast";

export const columns: ColumnDef<IArticle>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "title",
    header: () => {
      return <div>Title</div>;
    },
    cell: ({ row }) => (
      <div className="line-clamp-1">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: () => <div className="text-right">Author</div>,
    cell: ({ row }) => {
      const { name }: { name: string } = row.getValue("author");
      return <div className="text-right font-medium">{name}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const [dropdownOpen, setDropDownOpen] = React.useState(false);

      const handleDelete = async (id: string) => {
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
          const res = await deleteArticle(token.accessToken, id);

          if (res.success) {
            toast({
              title: "success",
              description: res.message,
              className: "mt-4",
            });
            // @ts-ignore
            table.options.meta?.removeRow?.(row.original.id);
          } else {
            toast({
              title: "Sorry!",
              description: res.message || "error in deleting article",
              className: "mt-4",
              variant: "destructive",
            });
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
      return (
        <Dialog>
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
              <Link prefetch={false} href={`/admin/article/${row.original.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Edit Article
                </DropdownMenuItem>
              </Link>

              <div className="px-2 bg-red-600 rounded cursor-pointer">
                <DialogTrigger asChild>
                  <p>Delete</p>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="p-6">
                      Do you really want to delete the article -{" "}
                      {row.original.title}
                    </DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        onClick={() => handleDelete(row.original.id)}
                        variant={"outline"}
                      >
                        Confirm
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      );
    },
  },
];

export function ArticlesTable({
  articles,
  page,
  goToPage,
  SetPerPage,
  setQuery,
  loading,
  totalPage,
}: {
  articles: IArticle[];
  loading: boolean;
  page: number;
  goToPage: GoToPageFunction;
  setQuery: UpdateQueryFunction;
  SetPerPage: UpdatePerPageFunction;
  totalPage: number;
}) {
  const [data, setData] = React.useState(articles);

  React.useEffect(() => {
    setData(articles);
  }, [articles]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {},
    meta: {
      removeRow: (id: string) => {
        setData((prev) => prev.filter((prv) => prv.id !== id));
      },
    },
  });

  const rows = table.getRowModel().rows;
  const hasRows = rows?.length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search Articles..."
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-sm"
        />

        <div className="ml-auto">
          <Select onValueChange={(v) => SetPerPage(Number(v))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select table size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"10"}>10 articles</SelectItem>
                <SelectItem value={"20"}>20 articles</SelectItem>
                <SelectItem value={"30"}>30 articles</SelectItem>
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
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={page === totalPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
