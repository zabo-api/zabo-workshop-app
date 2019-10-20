import './../styles/index.scss'
import 'zabo-sdk-js'

Zabo.init({
  clientId: 'J28kJ68mHfiXSYLqyoujgFA4mCrRGxBiUkELZS1YImTyD4DAhNmR9VZqpiFpqRUV',
  env: 'sandbox'
})
let div = document.createElement('div')

document.querySelector('#connect').addEventListener('click', () => {
  Zabo.connect().onConnection(function (account) {
    console.log('account connected:', account)
    let joinText = document.getElementsByClassName('join')
    for (let i = 0; i < joinText.length; i++) {
      joinText[i].style.display = 'none'
    }
    let node = document.createTextNode("Congratulations, we see that you hold " + account.currencies.length + " currencies in this wallet. You are now part of the club. You may also join any division highlighted in green. You cannot join divisions highlighted in red.")
    div.appendChild(node)
    document.querySelector('#club-info').appendChild(div)
    let clubButtons = document.getElementsByClassName('club')
    for (let i = 0; i < clubButtons.length; i++) {
      if (account.currencies.some(a => a.currency === clubButtons[i].id)) {
        clubButtons[i].style.color = 'rgb(39, 155, 54)'
        clubButtons[i].style.borderColor = 'rgb(39, 155, 54)'
      }
    }
    document.querySelector('#club-info').style.display = 'block'
  }).onError(error => {
    console.error('account connection error:', error)
  });
});