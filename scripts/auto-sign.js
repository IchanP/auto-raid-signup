// eslint-disable-next-line no-undef
/* chrome.storage.local.set({
  fromScript: 'hello from script'
}) */
console.log(document)

const buttonNodes = document.querySelector('.centeringWrapper-dGnJPQ')
console.log(buttonNodes)
const messageNodes = document.querySelectorAll('.messageListItem-ZZ7v6g')
console.log(messageNodes)

console.log(document.readyState)

const determineScriptID = setInterval(() => {
  if (document.readyState === 'complete') {
    determineScript()
  }
}, 1000)

/**
 *
 */
const determineScript = () => {
  clearInterval(determineScriptID)
  // Determine whether we're on login page or in the channel
  const continueInBrowserNodes = document.querySelectorAll('.contents-3NembX')
  for (const nodes of continueInBrowserNodes) {
    console.log(nodes.innerText)
    if (nodes.innerText === 'Continue in Browser') {
      loginToDiscord(nodes)
    }
  }
}

/**
 * Performs the operations to login to discord.
 *
 * @param {HTMLElement} browserNode - The element passed, should be the continue in browser element.
 */
const loginToDiscord = (browserNode) => {
  console.log(browserNode.parentElement)
  browserNode.parentElement.click()
  const awaitLoginFieldsID = setInterval(() => {
    const loginButton = document.querySelector('.button-1cRKG6')
    const loginFields = document.querySelectorAll('.inputDefault-Ciwd-S')
    if (loginButton.firstElementChild.innerText === 'Log In' && (loginFields[0].value !== '' && loginFields[1].value !== '')) {
      clearInterval(awaitLoginFieldsID)
      loginButton.click()
    }
  }, 1000)
}
