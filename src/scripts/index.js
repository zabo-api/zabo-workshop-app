import './../styles/index.scss'
import 'zabo-sdk-js'

Zabo.init({
  clientId: 'njACEbH5kqNEzaDBIP1orCcWth95okgdLRKXLnfBFsib3OK51mrvOoNKjkBEJohY',
  env: 'sandbox'
})

let selectedClub = ''
let toAddress = ''

document.querySelector('#connect').addEventListener('click', () => {
  Zabo.connect().onConnection(function (account) {
    console.log('account connected:', account)

    let node = document.createTextNode(
      "Congratulations, we see that you hold " +
      account.currencies.length +
      " currencies in this wallet. You are now part of the Awesome Crypto Club.")

    let div = document.createElement('div')
    div.appendChild(node)
    document.querySelector('#member-welcome').appendChild(div)

    let clubButtons = document.getElementsByClassName('club')
    for (let i = 0; i < clubButtons.length; i++) {
      if (account.currencies.some(a => a.currency === clubButtons[i].id)) {
        clubButtons[i].style.color = 'rgb(39, 155, 54)'
        clubButtons[i].style.borderColor = 'rgb(39, 155, 54)'
        clubButtons[i].addEventListener('click', () => {
          selectedClub = clubButtons[i].id
          toAddress = clubButtons[i].getAttribute('address')
          document.getElementById('donation-input').style.display = 'block'
        })
      }
    }
  }).onError(error => {
    console.error('account connection error:', error)
  });
});

document.querySelector('#donate-button').addEventListener('click', () => {

  let donateValue = document.getElementById('amount').value
  Zabo.transactions.send({
    currency: selectedClub,
    toAddress: toAddress,
    amount: donateValue
  }).then(tx => {
    let txInfoDiv = document.getElementById('tx-info')
    let node = document.createTextNode(JSON.stringify(tx))
    txInfoDiv.appendChild(node)
    let bottomText = document.getElementsByClassName('bottom-text')
    for (let i = 0; i < bottomText.length; i++) {
      bottomText[i].style.display = 'block'

    }
  })
});