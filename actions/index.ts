import { registerUserAction, loginUserAction } from "./auth";
import { registerAccountAction } from "./account";

export const actions = {
  auth: {
    registerUserAction,
    loginUserAction,
  },
  accounts: {
    registerAccountAction,
  },
};
