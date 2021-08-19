console.log('hi')
browser.contextMenus.create({
  id: 'showNames',
  title: 'Show Control Names',
})
browser.contextMenus.create({
  id: 'removeNames',
  title: 'Hide Control Names',
})
browser.contextMenus.create({
  id: 'retrieveRecord',
  title: 'Retrieve Current Record',
})
browser.contextMenus.create({
  id: 'unlockFields',
  title: 'Unlock All Fields (Deprecated)',
})
browser.contextMenus.create({
  id: 'showAllControls',
  title: 'Show All Controls (Deprecated)',
})
browser.contextMenus.create({
  id: 'getUpdateCode',
  title: 'Get Update Code',
})
browser.contextMenus.onClicked.addListener((info, tab) => {
  console.log('Menu clicked')
  switch (info.menuItemId) {
    case 'showNames':
      showNames(tab.id)
      break
    case 'retrieveRecord':
      retrieveRecord(tab.id)
      break
    case 'removeNames':
      removeNames(tab.id)
      break
    case 'unlockFields':
      unlockFields(tab.id)
      break
      case 'showAllControls':
        showControls(tab.id)
      break
      case 'getUpdateCode':
        getUpdateCode(tab.id)
      break
  }

})

function showNames(tabId) {
  //console.log('tabId', tabId)
  browser.tabs.executeScript(tabId, {
    file: 'getFieldNames.js'
  })
}
function removeNames(tabId) {
  //console.log('tabId', tabId)
  browser.tabs.executeScript(tabId, {
    file: 'removeFieldNames.js'
  })
}
function retrieveRecord(tabId) {
  //console.log('tabId', tabId)
  browser.tabs.executeScript(tabId, {
    file: 'retrieveRecord.js'
  })
}
function unlockFields(tabId) {
  //console.log('tabId', tabId)
  browser.tabs.executeScript(tabId, {
    file: 'unlockFields.js'
  })
}
function showControls(tabId) {
  //console.log('tabId', tabId)
  browser.tabs.executeScript(tabId, {
    file: 'showControls.js'
  })
}
function getUpdateCode(tabId) {
  //console.log('tabId', tabId)
  browser.tabs.executeScript(tabId, {
    file: 'getUpdateCode.js'
  })
}

