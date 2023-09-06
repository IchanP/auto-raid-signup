const classSelector = document.querySelector('#classSelection')
const discordLinkElement = document.querySelector('#discordLink')
const optionsForm = document.querySelector('form')

const retailClasses = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker']

const emoteWrapper = document.getElementById('emoteWrapper')

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

  console.log(classSelector.value)
  console.log(discordLinkElement.value)
  const classEmoteNames = document.getElementsByClassName('wowClassInput')
  console.log(classEmoteNames)

  chrome.storage.local.set({
    selectedClass: classSelector.value
  })
})
