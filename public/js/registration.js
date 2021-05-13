const loginButton = document.querySelector('.login-button')

const loginForm = document.querySelector('.login-form__container')

loginButton.addEventListener('click', function() {
  loginForm.classList.toggle('hidden')
})

const closeButtons = document.querySelectorAll('.close-button')

closeButtons.forEach(item => {
  item.addEventListener('click', () => {
    item.parentNode.parentNode.classList.toggle('hidden')
  })
})

//check passwords

const password = document.querySelector('#passwordInput')
const verification = document.querySelector('#passwordVerification')
const submitButton = document.querySelector('input[type="submit"]')

function enableVerification() {
  if (password.value.length >= 8) {
    verification.removeAttribute('disabled')
  } else {
    verification.setAttribute('disabled', true)
  }
  checkPasswords()
}

// display if somethings wrong
const emailErrorDisplay = document.querySelector('.email-error')
const wrongPassword = document.querySelector('.password-error')

function checkPasswords() {
  if (password.value === verification.value) {
    wrongPassword.innerHTML = ""
  } else {
    wrongPassword.innerHTML = "passwords dont match"
  }
}

function checkIfValid(form) {
  event.preventDefault()

  let valid = false

  if (wrongPassword.innerHTML === "" && emailErrorDisplay.innerHTML === "") {
    valid = true
  }

  if (valid) {
    form.submit()
  } else {
    return
  }
}