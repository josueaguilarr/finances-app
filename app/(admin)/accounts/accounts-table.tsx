"use client";

import { Account, columns } from "./columns";
import { DataTable } from "./data-table";

export default function AccountsTable({ data }: { data: Account[] }) {
  return <DataTable columns={columns} data={data} />;
}
