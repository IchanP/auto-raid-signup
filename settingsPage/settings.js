const classSelectorElement = document.querySelector('#classSelection')
const discordLinkElement = document.querySelector('#discordLink')
const optionsForm = document.querySelector('form')
const tokenElement = document.querySelector('#discordToken')

/**
 * Displays the previously saved setting if set to passed element.
 *
 * @param {string} storageName - The key to value to get from storage.
 * @param {HTMLInputElement} inputElement - The input element to append to.
 */
function displayPreviousSetting (storageName, inputElement) {
  chrome.storage.local.get(storageName).then((result) => {
    if (result[storageName]) {
      inputElement.value = result[storageName]
    }
  })
}

// Display all the previously set settings
displayPreviousSetting('token', tokenElement)
displayPreviousSetting('discordChannel', discordLinkElement)
displayPreviousSetting('selectedClass', classSelectorElement)

const retailClasses = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker']

const savedClassEmotes = await getSavedEmotes()

const emoteWrapper = document.getElementById('emoteWrapper')

// Simply add input field for each class to the DOM.
retailClasses.forEach((wowClass) => {
  const classLabel = document.createElement('label')
  classLabel.setAttribute('for', wowClass)
  classLabel.textContent = wowClass
  const classInput = document.createElement('input')
  classInput.setAttribute('type', 'text')
  classInput.setAttribute('name', wowClass)
  classInput.setAttribute('id', wowClass)
  classInput.setAttribute('class', 'wowClassInput')
  classInput.setAttribute('autocomplete', 'off')
  // Re-add the saved settings to the input value
  for (const savedEmote of savedClassEmotes) {
    const emoteClassName = Object.keys(savedEmote)[0]
    if (emoteClassName === wowClass) {
      classInput.value = savedEmote[emoteClassName]
    }
  }

  emoteWrapper.append(classLabel, classInput)
})

optionsForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const classEmoteNames = document.getElementsByClassName('wowClassInput')

  // Set storage for discord link, selected class and the emotes on the server
  chrome.storage.local.set({
    selectedClass: classSelectorElement.value ? classSelectorElement.value : null
  })
  chrome.storage.local.set({
    discordChannel: discordLinkElement.value ? discordLinkElement.value : null
  })

  chrome.storage.local.set({
    token: tokenElement.value ? tokenElement.value : null
  })

  for (const inputElement of classEmoteNames) {
    const nameOfClass = inputElement.getAttribute('id')
    const storageObject = {}
    storageObject[nameOfClass] = inputElement.value
    chrome.storage.local.set(storageObject)
  }
  chrome.alarms.create('updated-settings', {
    when: Date.now() + 5000
  })
})

/**
 * Gets the saved emote values from storage.
 *
 * @returns {Array[Object]} - Returns the emotes as key value pairs in an array.
 */
async function getSavedEmotes () {
  const savedEmotes = await Promise.all(
    retailClasses.map(async (retailClass) => {
      const emotePair = await chrome.storage.local.get([retailClass])
      return emotePair
    })
  )
  return savedEmotes
}
