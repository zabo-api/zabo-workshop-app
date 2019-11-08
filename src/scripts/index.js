import './../styles/index.scss'
import 'zabo-sdk-js'

Zabo.init({
  clientId: 'pQ9TTe1q8AXHiWkCFb7GSISTYlWHc1lU3Wv70972CEjM7u73R8EEPT15F6hLesi9',
  env: 'sandbox'
})

let selectedClub = ''
let toAddress = ''
let memberWelcome = document.querySelector("#member-welcome")
let clubButtons = document.getElementsByClassName('club')
let donateButton = document.querySelector('#donate-button')
let amountInput = document.getElementById('amount')

document.querySelector('#connect').addEventListener('click', () => {
  Zabo.connect().onConnection(function (account) {
    console.log('account connected:', account)

    let node = document.createTextNode(
      "Congratulations, we see that you hold " +
      account.currencies.length +
      " currencies in this wallet. You are now part of the Awesome Crypto Club.")

    let div = document.createElement('div')
    div.appendChild(node)
    memberWelcome.appendChild(div)

    for (let i = 0; i < clubButtons.length; i++) {
      if (account.currencies.some(c => c.currency === clubButtons[i].id)) {
        makeButtonActive(clubButtons[i])
      }
    }
  }).onError(error => {
    console.error('account connection error:', error)
  });
});

donateButton.addEventListener('click', () => {

  let donateValue = amountInput.value
  Zabo.transactions.send({
    currency: selectedClub,
    toAddress: toAddress,
    amount: donateValue
  }).then(tx => {
    displayTx(tx)
  })
});


function makeButtonActive(button) {
  button.style.color = 'green'
  button.style.borderColor = 'green'
  button.addEventListener('click', () => {
    selectedClub = button.id
    toAddress = button.getAttribute('address')
    document.getElementById('donation-input').style.display = 'block'
  })
}

function displayTx(tx) {
  let txInfoDiv = document.getElementById('tx-info')
  let node = document.createTextNode(JSON.stringify(tx))
  txInfoDiv.appendChild(node)
  let bottomText = document.getElementsByClassName('bottom-text')
  for (let i = 0; i < bottomText.length; i++) {
    bottomText[i].style.display = 'block'
  }
}