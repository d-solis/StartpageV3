/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"VUXDaTVBaEdhoMQc","label":"","bookmarks":[{"id":"C8pe25FTYtmU9l8T","label":"Google Mail","url":"https://mail.google.com/"},{"id":"tlF3bfVvo4U8stzo","label":"Outlook","url":"https://outlook.com"},{"id":"RnvHwqXsD0sJfEjx","label":"Github","url":"https://github.com/d-solis"},{"id":"dJ1TFCzBq63v6F0m","label":"Password Manager","url":"https://vault.bitwarden.com/#/login"}]},{"id":"Yg0jsEliQLIrvRe1","label":"","bookmarks":[{"id":"uy1ixjHTSVGcUiXx","label":"Pixlr","url":"https://pixlr.com/e/"},{"id":"GqffPSpiXpLp2878","label":"DeviantArt","url":"https://www.deviantart.com/"},{"id":"y4RdoYhVWa4Uqymq","label":"Unsplash","url":"https://unsplash.com/"},{"id":"To6zpdXAMpdKUKUm","label":"r/Unixporn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"S5nZBqJSQkYfyYse","label":"","bookmarks":[{"id":"n9ZYDFgY9SIDfFoK","label":"Reddit","url":"reddit.com"},{"id":"xp3Nr8nlKCOV9tmu","label":"YouTube","url":"youtube.com"},{"id":"EMXIcu5WzZ89QKah","label":"Animixplay","url":"animixplay.to"},{"id":"p1XSxQtNcRe1TLoW","label":"Movies & TV","url":"movies4discord.xyz"}]},{"id":"dImVVxbFuwvSLuCO","label":"","bookmarks":[{"id":"qckJkxnNvxvaUClQ","label":"Youtube Music","url":"https://music.youtube.com/"},{"id":"TTwYOPTZxgUeAhOE","label":"Spotify","url":"https://open.spotify.com/"},{"id":"zjkJ9asiaYEJOjwT","label":"Drumbit","url":"https://drumbit.app/"},{"id":"XAbiTh2W7oCB1Crh","label":"Incredibox","url":"https://www.incredibox.com/demo/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
