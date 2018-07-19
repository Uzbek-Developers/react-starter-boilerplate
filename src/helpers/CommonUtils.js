import fp from "lodash/fp"
import { CURRENCY, DEFAULT_EXCHANGE_RATE } from "../constants/Constants"
import { HOST } from "../constants/Host"
import NoImageBoldIcon from "../assets/images/icons/no-image-bold.png"
import ProductNoImage from "../assets/images/no_image.png"
export function canUseDOM() {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  )
}

export const getDefaultBranch = companyGroup => {
  return companyGroup.companyList.find(
    ({ id }) => id == companyGroup.defaultCompanyId
  )
}
export const hasField = key => fp.has(key)
export const addClassBodyWhenReveal = (
  visible,
  defaultClassName = "modal-open"
) => {
  if (canUseDOM()) {
    window.document.body.className = ""
    if (visible) {
      var orig = window.document.body.className
      window.document.body.className =
        orig + (Boolean(orig) ? " " : "") + defaultClassName
    }
  }
}

export const handleParentClick = (
  currentTarget,
  fn,
  className = "reveal-overlay"
) => {
  if (currentTarget) {
    const str = currentTarget.className ? currentTarget.className.trim() : ""
    if (fp.includes(className, str)) {
      fn()
    }
  }
}

export const containsString = (str1, str2) => {
  if (typeof str1 === "string" || str1 instanceof String) {
    return str1.indexOf(str2) > -1
  }
  return false
}
export const getRandomRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
export const editOrAddItemByIndex = (list, index, item) => {
  if (index === -1) {
    list.push(item)
  } else {
    list[index] = item
  }
  return list
}
export const fillString = (str, limit, symbol) => {
  while (str.length < limit) {
    str = symbol + str
  }

  return str
}
export const truncateString = (text, maxLength) => {
  var ret = text
  if (ret) {
    if (ret.length > maxLength) {
      ret = ret.substr(0, maxLength - 3) + "..."
    }
  }
  return ret
}
export const stringFormat = (str, ...args) => {
  let formatted = str
  for (let arg in args) {
    formatted = formatted.replace("{" + arg + "}", args[arg])
  }
  return formatted
}
export const isString = str => {
  return (
    typeof str === "string" ||
    (typeof str === "string" && str.constructor === String)
  )
}
export const getFullPath = (link, defaultImage = NoImageBoldIcon) => {
  return link ? HOST + link : defaultImage
}
export const getFullPathProduct = (link, defaultImage = ProductNoImage) => {
  return link ? HOST + link : defaultImage
}
export const getFullPathCategory = (link, defaultImage = NoImageBoldIcon) => {
  return link ? HOST + link : defaultImage
}
export const replaceAll = (str1, str2, str3) => {
  let regex = new RegExp(str2, "g")

  return str1.replace(regex, str3)
}
export const calcSale = (price, oldPrice) => {
  return -parseInt(100 - price * 100 / oldPrice)
}
export const roundPrice = (price, accuracy, isTop = false, diff = 1) => {
  const integerPrice = isTop ? Math.ceil(price) : Math.floor(price)
  // const residue = (integerPrice % accuracy);
  // const round = integerPrice / accuracy;
  // const divide = round / accuracy;
  // const divideNumber = divide > 5 ? 5 : 1;
  // const fiveDivide = isTop ? Math.ceil(divide / divideNumber) : Math.floor(divide / divideNumber);
  const divide = isTop
    ? Math.ceil(integerPrice / diff)
    : Math.floor(integerPrice / diff)
  return divide * diff
}
export const toFormattedNumber = (number, suffix = CURRENCY.UZS, prefix) => {
  if (number || number == 0) {
    number = parseFloat(number).toFixed(2)
    const arr = (number + "").split(".")
    // const left = Math.round((number % Math.round(number)) * 100);
    // number = number.toString();
    number = number.replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(/\.\d*$/g, "")
    if (arr.length > 1 && arr[1] != "00" && arr[1] != "0") {
      number += "," + arr[1]
    }
  }
  return number || 0
}
export const toUSDPrice = (price, exchangeRate = DEFAULT_EXCHANGE_RATE) => {
  return price / exchangeRate
}
export const toUSDPriceFormatted = (price, exchangeRate) => {
  const obj = { isInt: false }
  obj.priceAmount = toFormattedNumber(toUSDPrice(price, exchangeRate))

  if (parseInt(obj.priceAmount) == obj.priceAmount) {
    obj.isInt = true
  }
  return `$${obj.priceAmount}${obj.isInt ? ",00" : ""}`
}
export const toFormattedPhone = number => {
  let text = number
  if (number) {
    text = number.toString()
    text = text[0] == "+" ? text : "+" + text
    text = text.replace(/(.{6})(\d{3})(\d{2})(\d{2})/, "($1) $2 $3 $4")
  }
  return text
}
export const toNumberString = str => {
  return str ? str.replace(/\D/g, "") : 0
}
export const clearSymbols = str => {
  return str.replace(/[&\/\\#,+()$~%.'":*?<>{}\s]/g, "")
}
export const hasRestrictedSymbols = str => {
  let limitedSymbols = /[#/\[\]%&+=~|¬^<>¦]/
  return limitedSymbols.test(str)
}
export const replaceRequestSymbols = str => {
  if (!isEmpty(str)) {
    str = str.replace(/[&]/g, "[and]")
    //        str = str.replace(/\=/g, "[equals]");
    //        str = str.replace(/\%/g, "[percent]");
    str = str.replace(/[+]/g, "[plus]")
  }
  return str
}
export const separateWords = str => {
  let result
  if (str) {
    result = str.split("").map(function(item) {
      if (/[A-Z]/.test(item)) {
        item = " " + item
      }
      return item
    })
    result = result.join("").trim()
  }
  return result
}
export const toYouTubeUrl = str => {
  return str.replace(
    /(http:|https:)*?\/\/www.youtube.com\/embed/g,
    "http://www.youtube.com/embed"
  )
}
export const isNumber = obj => {
  return (
    typeof obj == "number" ||
    (typeof obj == "object" && obj["constructor"] === Number)
  )
}
export const toNumber = val => {
  return isNumber(val) ? val : parseInt(toNumberString(val))
}
export const getMin = (num1, num2) => {
  return num1 < num2 ? num1 : num2
}
export const getMax = (num1, num2) => {
  return num1 > num2 ? num1 : num2
}
export const getOpposite = val => {
  return val === 0 ? 1 : 0
}
export const clearArray = arr => {
  if (arr && Array.isArray(arr)) {
    arr.length = 0
  }
}
export const containsItem = (arr, item) => {
  if (arr && Array.isArray(arr)) {
    return arr.indexOf(item) > -1
  } else {
    return arr === item
  }
}
export const convertArray = arr => {
  let arrObject = {}

  for (let i = 0; i < arr.length; i++) {
    arrObject[arr[i].name || arr[i]] = []
  }

  return arrObject
}
export const getIndex = (arr, item, defaultIndex) => {
  if (arr && Array.isArray(arr) && item) {
    let index = arr.indexOf(Array.isArray(item) ? item : item.toString())

    if (index > -1) {
      return index
    }
  }

  return defaultIndex || -1
}
export const removeIndex = (arr, index) => {
  if (arr && Array.isArray(arr)) {
    if (index > -1 && index < arr.length) {
      arr.splice(index, 1)
    }
  }
}
export const removeItem = (arr, item) => {
  if (arr && Array.isArray(arr)) {
    let index = arr.indexOf(item)

    if (index > -1) {
      arr.splice(index, 1)
    }
  }
}
export const pushArray = (arr1, arr2) => {
  if (arr1 && arr2 && Array.isArray(arr1)) {
    arr1.push.apply(arr1, Array.isArray(arr2) ? arr2 : [arr2])
  }
}
export const addItemToBegin = (arr1, item) => {
  if (arr1 && item) {
    arr1.splice(0, 0, item)
  }
}
export const setArray = (arr1, arr2) => {
  clearArray(arr1)
  pushArray(arr1, arr2)
}
export const toArray = arr => {
  return arr ? (Array.isArray(arr) ? arr : [arr]) : []
}
export const clone = obj => {
  return JSON.parse(JSON.stringify(obj))
}
export const isEmpty = obj => {
  return !obj || (Array.isArray(obj) && obj.length === 0)
}
export const isNotNormal = str => {
  return (
    isEmpty(str) ||
    str == "undefined" ||
    str == "null" ||
    str == "NaN" ||
    str === "*" ||
    str === "-1" ||
    str === "-2"
  )
}
