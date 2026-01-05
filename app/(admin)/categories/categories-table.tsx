"use client";

import { DataTable } from "@/components/data-table";
import { type Category, columns } from "./columns";

export default function CategoriesTable({ data }: { data: Category[] }) {
  return <DataTable columns={columns} data={data} />;
}
