async function checkEmailAvailability() {
  // element to display the user if something went wrong when logging in
  const errorDisplay = document.querySelector('.email-error')
  xhr = new XMLHttpRequest()
  event.preventDefault()
  const form = document.querySelector('#registration-form')

  const url = `/checkEmail`

  let data = {
    email: form.elements.email.value
  }

  // created bodyData to send though XML using this: https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
  let bodyData = []

  for (property in data) {
    const encodedKey = encodeURIComponent(property)
    const encodedValue = encodeURIComponent(data[property])
    bodyData.push(encodedKey + "=" + encodedValue)
  }

  bodyData = bodyData.join("&")

  try {
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhr.onload = function() {
      if (this.responseText === "that email is already in use") {
        errorDisplay.innerHTML = this.responseText
      } else {
        errorDisplay.innerHTML = ""
      }
    }

    xhr.send(bodyData)
  } catch (e) {
    console.log(e)
  }
}