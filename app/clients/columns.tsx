"use client";

import { DeleteClientButton } from "@/components/delete-client-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Client = {
  id: string;
  name: string;
  image: string;
  username: string;
  createdAt: string;
  birthDate: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image: string = row.getValue("image");
      const name: string = row.getValue("name");
      return (
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback className="bg-blue-500 font-semibold">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-x-1 -ml-2"
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
    cell: ({ row }) => {
      const birthDate: string = row.getValue("birthDate");
      const date = new Date(birthDate).toISOString().split("T")[0];
      const formattedDate = date.split("-").join("/");
      return formattedDate;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      const date = new Date(createdAt).toISOString().split("T")[0];
      const formattedDate = date.split("-").join("/");
      return formattedDate;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border p-2">
            <DropdownMenuLabel className="font-semibold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.id)}
              className="cursor-pointer"
            >
              Copy client ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(client.username)}
              className="cursor-pointer"
            >
              Copy username
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteClientButton id={client.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
