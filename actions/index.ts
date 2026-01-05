import { registerUserAction, loginUserAction } from "./auth";
import { registerAccountAction } from "./account";
import { registerCategoryAction } from "./category";

export const actions = {
  auth: {
    registerUserAction,
    loginUserAction,
  },
  accounts: {
    registerAccountAction,
  },
  categories: {
    registerCategoryAction,
  },
};
