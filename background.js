/* eslint-disable no-undef */
const retailClasses = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker']
let createdTab
let emoteName

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
    const selectedClass = await getFirstFieldFromStorage('selectedClass')
    const discordLink = await getFirstFieldFromStorage('discordChannel')
    if (retailClasses.find((className) => className === selectedClass)) {
      emoteName = await getFirstFieldFromStorage(selectedClass)
    }
    // Make sure we're trying to navigate to a discord link
    if (emoteName !== '' && discordLink.includes('discord.com/channels/')) {
      createdTab = await chrome.tabs.create({
        active: false,
        url: discordLink
      })
    }
  }
})

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (createdTab && details.tabId === createdTab.id) {
    // Immediately reset the createdTab so the listener is not triggered again
    createdTab = null
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      args: [{ emoteName }],
      /**
       * Assigns the variables from args to self, to make them available inside the scripts file.
       *
       * @param {object} vars - The variables to assign to self
       * @returns {object} - Returns the self object.
       */
      func: vars => Object.assign(self, vars)
    }, function () {
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        files: ['./scripts/auto-sign.js']
      })
    })
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

/**
 * Redirects the user to the settings page when the user clicks the plugin icon.
 */
const extensionIconClickListener = () => {
  chrome.tabs.create({ url: './settingsPage/settings.html' })
}

chrome.action.onClicked.addListener(extensionIconClickListener)
