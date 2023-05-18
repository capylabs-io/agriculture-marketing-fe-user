import axios from "axios";
import utils from "@/plugins/utils";

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
// axios.defaults.baseURL = "https://neobank-dev-api.capylabs.io/api/";

const USER_API = "/users/";
const POST_API = "/posts/";
const PRODUCT_API = "/products/";
const PRODUCT_CATEGORY_API = "/product-categories/";
const POST_CATEGORY_API = "/post-categories/";

const APIHelper = (api) => ({
  search: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  count: (params, option) =>
    axios.get(api + "count", { params: utils.filterObject(params) }, option),
  fetch: (params, option) =>
    axios.get(api, { params: utils.filterObject(params) }, option),
  fetchOne: (id, params, option) =>
    axios.get(api + id, { params: utils.filterObject(params) }, option),
  create: (params, options) =>
    axios.post(api, utils.filterObject(params), options),
  update: (id, params, option) =>
    axios.put(api + id, utils.filterObject(params), option),
  remove: (id, option) => axios.delete(api + id, option),
});
export const APIRespository = APIHelper;
export const Auth = {
  signIn: (signInData) => axios.post("/admin/auth", signInData),
};

export const User = {
  ...APIHelper(USER_API),
};
export const Category = {};
export const Post = {
  ...APIHelper(POST_API),
  topNewPost: () => {
    axios.get("posts?sort[0]=createdAt%3Adesc&populate=*&pagination[limit]=3");
  },
};
export const Product = {
  ...APIHelper(PRODUCT_API),
};
export const ProductCategory = {
  ...APIHelper(PRODUCT_CATEGORY_API),
};
export const PostCategory = {
  ...APIHelper(POST_CATEGORY_API),
};
