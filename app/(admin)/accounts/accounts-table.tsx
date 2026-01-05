"use client";

import { type Account, columns } from "./columns";
import { DataTable } from "@/components/data-table";

export default function AccountsTable({ data }: { data: Account[] }) {
  return <DataTable columns={columns} data={data} />;
}
