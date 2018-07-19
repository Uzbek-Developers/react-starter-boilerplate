import CrylicMap from "./CryllicMap"

const FILE_PATH_PATTERN = /^\/[a-z0-9\-_]+(.txt|.jpg|.jpeg|.js|.pdf|.png|.ico|.xml)$/i
const HTML_TAGS_PATTERN = /<\/?[!\w\d\s.'"=\-_;:%]+\/?>/g

export const convertCryllicToLatin = str =>
  str
    .split("")
    .reduce((word, l) => word + (CrylicMap.has(l) ? CrylicMap.get(l) : l), "")

export const isRootFileUrl = url => FILE_PATH_PATTERN.test(url)
export const getRootFileName = url => url && url.replace(/\//, "")

export const makeShortDescription = str =>
  str && str.replace(HTML_TAGS_PATTERN, "").slice(0, 250) + "..."
