import { Header } from "@/components/layout/header";
import { DataTable } from "./clients/data-table";
import { columns } from "./clients/columns";

const fetchClients = async () => {
  const res = await fetch(
    "https://682f1866746f8ca4a47fd112.mockapi.io/clients"
  );

  const data = await res.json();

  return data;
};

export default async function Home() {
  const data = await fetchClients();
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
