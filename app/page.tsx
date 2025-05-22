"use client";

import { Header } from "@/components/layout/header";
import { DataTable } from "./clients/data-table";
import { columns } from "./clients/columns";
import { useClientsQuery } from "@/hooks/useClientsQuery";

export default function Home() {
  const { data, isLoading } = useClientsQuery();

  if (!data) return null;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col mt-10">
        <div className="px-12">
          <DataTable columns={columns} data={data} />
        </div>
      </main>
    </>
  );
}
