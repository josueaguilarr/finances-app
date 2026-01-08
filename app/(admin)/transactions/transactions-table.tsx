"use client";

import { DataTable } from "@/components/data-table";
import { columns, TransactionRecords } from "./columns";

export default function TransactionsTable({ data }: { data: TransactionRecords[] }) {
  return <DataTable columns={columns} data={data} />;
}
