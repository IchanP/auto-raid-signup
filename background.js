/* eslint-disable no-undef */
const retailClasses = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker']
const navigateToUrl = 'https://myanimelist.net/profile/Oskz'
let createdTab

console.log(retailClasses)

// Initialize the first alarm on installation
self.addEventListener('install', () => {
  chrome.alarms.create('initiate-alarm', {
    when: Date.now() + 5000
  })
})

chrome.alarms.onAlarm.addListener(async (alarm) => {
  console.log(alarm.name)
  chrome.alarms.create('check-again-tomorrow', {
    when: Date.now() + 57_600_000
  })
  // If statement runs the script if alarm should trigger it
  if (alarm.name === 'check-again-tomorrow' || alarm.name === 'updated-settings') {
    // TODO generalzie the grabbinof these things
    const selectedClass = await chrome.storage.local.get(['selectedClass']).then((selectedClass) => {
      console.log('Background.js: This is your selected class: ')
      console.log(selectedClass.selectedClass)
      return selectedClass.selectedClass
    })
    const discordLink = await chrome.storage.local.get(['discordChannel']).then((discordLink) => {
      console.log('Background.js: This is the set link: ')
      console.log(discordLink)
      return discordLink
    })
    let emoteName
    if (retailClasses.find((className) => className === selectedClass)) {
      emoteName = await chrome.storage.local.get([selectedClass]).then((demonHunter) => {
        console.log('Background.js: This is selected class:')
        console.log(demonHunter)
        return demonHunter
      })
    }
    console.log(emoteName)
  }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(changeInfo.url)
  // TODO Add try catch or modify logic
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
/*  createdTab = await chrome.tabs.create({
    active: false,
    url: navigateToUrl
  }
  ) */
}

/**
 * Redirects the user to the settings page when the user clicks the plugin icon.
 */
const extensionIconClickListener = () => {
  chrome.tabs.create({ url: './settingsPage/settings.html' })
}

chrome.action.onClicked.addListener(extensionIconClickListener)
