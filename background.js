/* eslint-disable no-undef */
const retailClasses = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker']
const navigateToUrl = 'https://myanimelist.net/profile/Oskz'
let createdTab
importScripts('main.js')

console.log(retailClasses)

chrome.alarms.create('testing-again', {
  when: Date.now() + 5000
})

initialize()

chrome.alarms.onAlarm.addListener(function (alarm) {
  chrome.storage.local.get(['selectedClass']).then((result) => {
    console.log('Background.js: This is your selected class: ')
    console.log(result)
  })
  chrome.storage.local.get(['discordChannel']).then((result) => {
    console.log('Background.js: This is the set link: ')
    console.log(result)
  })
  chrome.storage.local.get(['Demon Hunter']).then((result) => {
    console.log('Background.js: This is DH:')
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
 * Redirects the user to the settings page when the user clicks the plugin icon.
 */
const extensionIconClickListener = () => {
  chrome.tabs.create({ url: './settingsPage/settings.html' })
}

chrome.action.onClicked.addListener(extensionIconClickListener)
