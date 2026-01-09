import { TitlePage } from "@/components/ui/title-page";
import { getCategoriesService } from "@/lib/supabase/categories";
import { Category } from "@/app/(admin)/categories/columns";
import { HeadPage } from "@/components/ui/head-page";
import CategoriesTable from "@/app/(admin)/categories/categories-table";
import { NewCategoryDialog } from "@/app/(admin)/categories/new-category-dialog";

export default async function Page() {
  const res = await getCategoriesService();

  if ("error" in res) {
    throw new Error(res.message);
  }

  const data: Category[] = res.categories;

  return (
    <>
      <HeadPage>
        <TitlePage>Categories</TitlePage>
        <NewCategoryDialog />
      </HeadPage>
      <CategoriesTable data={data} />
    </>
  );
}
