const classSelector = document.querySelector('#classSelection')
const discordLinkElement = document.querySelector('#discordLink')
const optionsForm = document.querySelector('form')

const retailClasses = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker']

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
  emoteWrapper.append(classLabel, classInput)
})

optionsForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const classEmoteNames = document.getElementsByClassName('wowClassInput')

  // Set storage for discord link, selected class and the emotes on the server
  chrome.storage.local.set({
    selectedClass: classSelector.value ? classSelector.value : null
  })
  chrome.storage.local.set({
    discordChannel: discordLinkElement.value ? discordLinkElement.value : null
  })

  for (const inputElement of classEmoteNames) {
    const nameOfClass = inputElement.getAttribute('id')
    const storageObject = {}
    storageObject[nameOfClass] = inputElement.value
    chrome.storage.local.set(storageObject)
  }
})
