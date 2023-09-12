// eslint-disable-next-line no-undef
/* chrome.storage.local.set({
  fromScript: 'hello from script'
}) */

const randId = [...crypto.getRandomValues(new Uint8Array(8))]
  .map((m) => ('0' + m.toString(16)).slice(-2))
  .join('')

const button = `<button id='${randId}' class="marginBottom8-emkd0_ button-1cRKG6 button-ejjZWC lookFilled-1H2Jvj colorBrand-2M3O3N sizeLarge-2xP3-w fullWidth-3M-YBR grow-2T4nbg" style="background: rgb(40, 45, 109) !important;"><div class="contents-3ca1mk">Token Login</div></button>`

/**
 * Gets the stored token from extension storage.
 *
 * @returns {string} - Returns the token as a string.
 */
const getStoredToken = async () => {
  const token = await chrome.storage.local.get('token').then(result => result.token)
  return token
}

const determineScriptID = setInterval(() => {
  if (document.readyState === 'complete') {
    determineScript()
  }
}, 1000)

/**
 * Determines the script to run, if user does not need to authenticate himself the signup script will run.
 */
const determineScript = () => {
  clearInterval(determineScriptID)
  // Determine whether we're on login page or in the channel
  const continueInBrowserNodes = document.querySelectorAll('.contents-3NembX')
  for (const nodes of continueInBrowserNodes) {
    if (nodes.innerText === 'Continue in Browser') {
      loginScript(nodes)
    }
  }
}

/**
 * Performs the operations to login to discord.
 *
 * @param {HTMLElement} browserNode - The element passed, should be the continue in browser element.
 */
const loginScript = (browserNode) => {
  browserNode.parentElement.click()

  setTimeout(() => {
    const accCard = document.querySelector('.accountCard-2lki2x')
    const loginButton = accCard.querySelector('.button-ejjZWC ')
    loginButton.click()
  }, 2000)

  const insertTokenLoginID = setInterval(() => {
    const container = document.querySelector(
      'div.mainLoginContainer-wHmAjP > div.block-3uVSn4.marginTop20-2T8ZJx'
    )
    if (container) {
      container.innerHTML = button + container.innerHTML
      clearInterval(insertTokenLoginID)
      const loginButton = document.getElementById(`${randId}`)
      loginButton.addEventListener('click', loginWithToken)
      loginButton.click()
    }
  }, 1000)
}

/**
 * Logs the user in using their saved token.
 */
const loginWithToken = async () => {
  /**
   * Performs the login.
   *
   * @param {string} token - The users login token.
   */
  function login (token) {
    setInterval(() => {
      document.body.appendChild(
        document.createElement`iframe`
      ).contentWindow.localStorage.token = `"${token}"`
    }, 50)
    setTimeout(() => {
      location.reload()
    }, 200)
  }
  const tokenToLogin = await getStoredToken()
  if (!tokenToLogin) {
    // TODO close the tab?
  }
  login(tokenToLogin)
}
