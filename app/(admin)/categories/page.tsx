import { TitlePage } from "@/components/ui/title-page";
import { getCategoriesService } from "@/lib/supabase/categories";
import { Category } from "./columns";
import { HeadPage } from "@/components/ui/head-page";
import { Dialog } from "@/components/dialog";
import { Plus } from "lucide-react";
import CategoriesTable from "./categories-table";
import { FormNewCategory } from "./new-category-form";

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
        <Dialog
          icon={Plus}
          buttonLabel="New category"
          btnLabelCancel="Cancel"
          btnLabelSuccess="Save"
          title="New category"
          description="Create a new category for manage your money."
        >
          <FormNewCategory />
        </Dialog>
      </HeadPage>
      <CategoriesTable data={data} />
    </>
  );
}
