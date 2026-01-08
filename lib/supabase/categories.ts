import { CategoryFormValues } from "@/validations/categories";
import { getUserSession } from "./auth";
import { createClient } from "./server";

export async function getCategoriesService() {
  const supabase = await createClient();

  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*");

    if (error) return { error: true, message: error.message };

    return { categories };
  } catch (error) {
    throw error;
  }
}

export async function getIdAndNameCategoriesService() {
  const supabase = await createClient();

  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, name");

    if (error) return { error: true, message: error.message };

    return { categories };
  } catch (error) {
    throw error;
  }
}

export async function registerCategoryService(
  categoryData: CategoryFormValues
) {
  const supabase = await createClient();
  const user = await getUserSession();

  const { name } = categoryData;

  try {
    const { error } = await supabase
      .from("categories")
      .insert([
        {
          user_id: user?.id,
          name,
        },
      ])
      .select();

    if (error) return { error: true, message: error.message };

    return { error: false };
  } catch (error) {
    throw error;
  }
}
