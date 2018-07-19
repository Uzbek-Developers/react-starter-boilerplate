import axios from "axios"
import { HOST } from "../constants/Host"
import qs from "qs"

export const headers = {
  Accept: "application/json"
}

const sendRequest = (url, data, headersArgs = {}, method = "post") => {
  const options = {
    url,
    method,
    baseURL: HOST,
    timeout: 40000,
    data,
    headers: {
      ...headers,
      ...headersArgs
    }
  }
  // console.log(url, data)
  if (method == "get" || method == "delete") {
    options.params = data
    options.paramsSerializer = params =>
      qs.stringify(params, { indices: false })
  }
  return axios(options)
}

export function get(url, payload, headers) {
  return sendRequest(url, payload, headers, "get")
}

export function post(url, payload, headers) {
  return sendRequest(url, payload, headers)
}

export function doGet(url, payload, headers) {
  return sendRequest(url, payload, headers, "get")
}

export function doPost(url, payload, headers) {
  return sendRequest(url, payload, headers)
}
export function doDelete(url, payload, headers) {
  return sendRequest(url, payload, headers, "delete")
}
export function doPut(url, payload, headers) {
  return sendRequest(url, payload, headers, "put")
}

const API_VERSION = "v1/"
const API = HOST + "/api/" + API_VERSION

export const MAIN_ROOT = API + "container/"
export const COMMON_ROOT = API + "common/"
export const PROMOTION_ROOT = API + "promotion/"
export const LOGIN_PHONE = API + "login-mobile-phone"
export const LOGIN_CODE = API + "login-mobile-code"
export const NEWS_ROOT = API + "news/"
export const HOME_ROOT = API + "home/"
export const PRODUCT_ROOT = API + "product/"
export const PRODUCT_REVIEW_ROOT = API + "product-review/"
export const CATEGORY_ROOT = API + "category/"
export const AUTH_ROOT = API + "auth/"
export const USER_ROOT = API + "user/"
export const SHOP_ROOT = API + "shop/"
export const CART_ROOT = API + "cart/"
export const ORDER_ROOT = API + "order/"
export const PAYMENT_ROOT = API + "payment/"
export const ADDRESS_ROOT = API + "client-address/"
export const WISHLIST_ROOT = API + "wishlist/"
export const WATCHLIST_ROOT = API + "watchlist/"
export const WALLET_ROOT = API + "wallet/"
export const COMPANY_ROOT = API + "company/"
export const SEARCH_ROOT = API + "search/"
export const STATIC_PAGE_ROOT = API + "static-pages/"
export const SUBSCRIPTION_ROOT = API + "subscription-package/"
export const FIREBASE_ROOT = API + "fcm/"
