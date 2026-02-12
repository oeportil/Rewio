// import instance from "@/config/axiosClient";
// import type { Toptions } from "../types";

// export const loginAction = async ({ email, password, errorfun }: {
//     email: string, password: string, errorfun: (options: Toptions) => void
// }) => {
//     try {
//         const response = await instance.post("/auth/login", { email, password });
//         return response.data;
//     } catch (error) {
//         console.error(error)
//         errorfun({ type: "error", content: error.response.data.msg  || "Error" });
//     }
// }
import type { Toptions } from "../types";
import { getBase, postBase } from "./base/base.service";

export const loginAction = async ({
  email,
  password,
  errorfun,
}: {
  email: string;
  password: string;
  errorfun: (options: Toptions) => void;
}) => {
  return postBase({ data: { email, password }, errorfun }, "/user/login");
};

export const registerAction = async ({
  data,
  errorfun,
}: {
  data: unknown
  errorfun: (options: Toptions) => void;
}) => {
  return postBase({ data, errorfun }, "/user/save");
};


export const getMeAction = async () => {
  return await getBase({ page: 1, limit: 1, search: "", errorfun: () => { } }, "/user/me");
}
