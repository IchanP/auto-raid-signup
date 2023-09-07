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
    const selectedClass = await getFirstFieldFromStorage('selectedClass')
    console.log(selectedClass)
    const discordLink = await getFirstFieldFromStorage('discordChannel')
    console.log(discordLink)
    let emoteName
    if (retailClasses.find((className) => className === selectedClass)) {
      emoteName = await getFirstFieldFromStorage(selectedClass)
    }
    console.log(emoteName)
  }
})

/**
 * Grabs the selected key value pair from storage.
 *
 * @param {string} key - The name of the key you wish to get.
 * @returns {Promise[string]} - Returns the first field value from key value pair.
 */
const getFirstFieldFromStorage = async (key) => {
  const keyValuePair = await chrome.storage.local.get([key]).then((keyValuePair) => {
    console.log(`Background.js: Getting ${key} from storage: `)
    return keyValuePair
  })
  return Object.values(keyValuePair)[0]
}

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
