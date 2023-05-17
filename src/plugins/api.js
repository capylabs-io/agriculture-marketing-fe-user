import axios from "axios";
import utils from "@/plugins/utils";

// axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.defaults.baseURL = "https://neobank-dev-api.capylabs.io/api/";

const USER_API = "/users/";
const CATEGORY_API = "/campaign-categories/";

const APIHelper = (api) => ({
  search: (params, option) => axios.get(api, { params: utils.filterObject(params) }, option),
  count: (params, option) => axios.get(api + "count", { params: utils.filterObject(params) }, option),
  fetch: (params, option) => axios.get(api, { params: utils.filterObject(params) }, option),
  fetchOne: (id, option) => axios.get(api + id, option),
  create: (params, options) => axios.post(api, utils.filterObject(params), options),
  update: (id, params, option) => axios.put(api + id, utils.filterObject(params), option),
  remove: (id, option) => axios.delete(api + id, option),
});
export const APIRespository = APIHelper;
export const Auth = {
  signIn: (signInData) => axios.post("/admin/auth", signInData),
};

export const User = {
  ...APIHelper(USER_API),
};

export const Category = {
  ...APIHelper(CATEGORY_API),
};
