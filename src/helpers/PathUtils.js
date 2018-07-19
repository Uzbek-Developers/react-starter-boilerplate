import fp from "lodash/fp"
import { convertCryllicToLatin } from "./StringUtils"
import { APP_HOST_NAME } from "../constants/Constants"
import qs from "qs"

export const parseStringToPath = fp.flow(convertCryllicToLatin, fp.kebabCase)

export const parseStoreHomePath = fp.flow(
  fp.values,
  fp.join(),
  parseStringToPath,
  s => "/store/" + s
)

export const storeArrayJoin = fp.flow(
  fp.map(fp.join("-")),
  fp.concat("/store"),
  fp.join("/")
)
export const makeStoreAliasFromCookies = fp.flow(
  fp.over([
    c => [c.get("storeName"), c.get("storeId")],
    c => [c.get("branchName"), c.get("branchId")]
  ]),
  storeArrayJoin
)
export const getStoreObjFromCookies = fp.flow(
  fp.over([
    c => ["storeName", c.get("storeName")],
    c => ["storeId", c.get("storeId")],
    c => ["branchName", c.get("branchName")],
    c => ["branchId", c.get("branchId")]
  ]),
  fp.fromPairs
)
export const getStoreObjFromCompany = fp.flow(
  fp.over([
    fp.over([
      fp.constant("storeName"),
      fp.flow(fp.get("companyGroup.name"), parseStringToPath)
    ]),
    fp.over([fp.constant("storeId"), fp.get("companyGroup.id")]),
    fp.over([
      fp.constant("branchName"),
      fp.flow(fp.get("name"), parseStringToPath)
    ]),
    fp.over([fp.constant("branchId"), fp.get("id")])
  ]),
  fp.fromPairs
)

export const getDefaultBranch = company => {
  return company.companyList.find(({ id }) => id == company.defaultCompanyId)
}
export const makeStoreAliasForChange = fp.flow(
  fp.over([
    fp.over([fp.flow(fp.get("name"), parseStringToPath), fp.get("id")]),
    fp.over([
      fp.flow(getDefaultBranch, fp.get("name"), parseStringToPath),
      fp.get("defaultCompanyId")
    ])
  ]),
  storeArrayJoin
)

export const makeBranchAliasForChange = fp.flow(
  fp.over([
    fp.over([
      fp.flow(fp.get("companyGroup.name"), parseStringToPath),
      fp.get("companyGroup.id")
    ]),
    fp.over([fp.flow(fp.get("name"), parseStringToPath), fp.get("id")])
  ]),
  storeArrayJoin
)

export const makeStorePathFromObj = fp.flow(
  fp.over([
    fp.over([fp.get("storeName"), fp.get("storeId")]),
    fp.over([fp.get("branchName"), fp.get("branchId")])
  ]),
  storeArrayJoin
)
export const makeCategoryProductsAlias = fp.flow(
  fp.over([fp.flow(fp.get("name"), parseStringToPath), fp.get("id")]),
  fp.join("-"),
  s => s + "/products"
)
export const makeProductItemAlias = fp.flow(
  fp.over([fp.flow(fp.get("name"), parseStringToPath), fp.get("id")]),
  fp.over([fp.constant("product"), fp.join("-")]),
  fp.join("/")
)
export const makeProductListPath = (cookies, category) =>
  `${makeStoreAliasFromCookies(cookies)}/${makeCategoryProductsAlias(category)}`

export const makeProductItemPath = (cookies, product) =>
  `${makeStoreAliasFromCookies(cookies)}/${makeProductItemAlias(product)}`

export const makeCategoryAllPath = (cookies, category) =>
  `${makeStoreAliasFromCookies(cookies)}/categories`

export const makePathStartWithStore = (cookies, path) =>
  `${makeStoreAliasFromCookies(cookies)}/${path}`

export const getQueryFromMatch = fp.flow(fp.get("search"), s =>
  qs.parse(s, { ignoreQueryPrefix: true })
)

export const getAliasId = fp.flow(fp.split("-"), fp.last, fp.toNumber)

export const getArrayIdWithNameFromPath = fp.flow(
  fp.split("-"),
  fp.over([fp.flow(fp.last, fp.toNumber), fp.flow(fp.initial, fp.join("-"))])
)

export const getCategoryIdFromParams = fp.flow(fp.get("category"), getAliasId)

export const getCurrentLocation = fp.flow(
  fp.over([fp.get("pathname"), fp.get("search")]),
  fp.join("")
)

export const getQueryFromLocation = fp.flow(fp.get("search"), s =>
  qs.parse(s, { ignoreQueryPrefix: true })
)
