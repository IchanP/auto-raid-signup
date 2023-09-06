/* eslint-disable no-undef */
const navigateToUrl = 'https://myanimelist.net/profile/Oskz'
let createdTab
importScripts('main.js')

chrome.alarms.create('testing-again', {
  when: Date.now() + 5000
})

initialize()

chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.storage.local.get(['selectedClass']).then((result) => {
    console.log('Background.js: This is your selected class: ')
    console.log(result)
  })
  chrome.alarms.create('testing-again', {
    when: Date.now() + 1500000
  })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === createdTab.id && changeInfo.url) {
    chrome.scripting.executeScript(
      {
        target: { tabId: createdTab.id },
        files: ['./scripts/mal.js']

      }
    )
  }
})

/**
 *
 * @param message
 */
async function justTestingFromMain (message) {
  console.log(message)
  createdTab = await chrome.tabs.create({
    active: false,
    url: navigateToUrl
  }
  )
}

/**
 *
 */
const extensionIconClickListener = () => {
  chrome.tabs.create({ url: './settingsPage/settings.html' })
}

chrome.action.onClicked.addListener(extensionIconClickListener)
