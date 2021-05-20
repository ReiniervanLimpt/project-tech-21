const loginButton = document.querySelector('.login-button')

const loginForm = document.querySelector('.login-form__container')

if (loginButton != undefined) {
  loginButton.addEventListener('click', function() {
    loginForm.classList.toggle('hidden')
  })
}

const closeButtons = document.querySelectorAll('.close-button')

closeButtons.forEach(item => {
  item.addEventListener('click', () => {
    item.parentNode.parentNode.classList.toggle('hidden')
  })
})