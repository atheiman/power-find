// Create a parent item and two children.
var parent = chrome.contextMenus.create({
  "title": "Search Selection",
  "id": "0",
  "contexts": ["selection"]
});

searches.forEach(function (obj) {
  console.log("creating context menu item: " + JSON.stringify(obj));
  var contextMenuId = chrome.contextMenus.create({
    "title": obj.title,
    "parentId": parent,
    "contexts": ["selection"],
    "id": (searches.indexOf(obj) + 1).toString()
  });
})

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  console.log(info.menuItemId);
  var searchObj = searches[info.menuItemId - 1]
  if (typeof searchObj === "undefined")
    return;
  chrome.tabs.create(  // https://developer.chrome.com/extensions/tabs#method-create
    {"url": searchObj.url.replace("%s", encodeURIComponent(info.selectionText))}
  );
})
