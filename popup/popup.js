const classSelector = document.querySelector('#classSelection')
const discordLinkElement = document.querySelector('#discordLink')
const optionsForm = document.querySelector('form')

optionsForm.addEventListener('submit', (event) => {
  event.preventDefault()

  // TODO write to storage
  console.log(classSelector.value)
  console.log(discordLinkElement.value)
})
