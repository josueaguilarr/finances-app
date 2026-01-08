import { registerUserAction, loginUserAction } from "./auth";
import { registerAccountAction } from "./account";
import { registerCategoryAction } from "./category";
import { registerTransactionAction } from "./transaction";

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
  transactions: {
    registerTransactionAction
  }
};
