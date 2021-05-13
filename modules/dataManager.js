const fs = require('fs')
const jsonFile = './data/foodLove.json'

const dataManager = {
  createUser: function(req, res) {
    const {
      name,
      birthDate,
      sex,
      cuisine,
      preference,
      location,
      description,
      email,
      password
    } = req.body

    fs.readFile(jsonFile, (err, content) => {
      if (err) return console.log(err)
      const contentJSON = JSON.parse(content)
      processData(contentJSON)
    })

    function processData(data) {
      const users = data.users
      const userId = users.length + 1
      console.log(userId)
      const newUserData = {
        userId,
        name,
        birthDate,
        sex,
        cuisine,
        preference,
        location,
        description,
        email,
        password
      }
      data.users.push(newUserData)
      fs.writeFile(jsonFile, JSON.stringify(data), err => {
        if (err) console.log(err)
      })
    }
  },



  logIn: async function(req, res) {
    const {
      email,
      password
    } = req.body

    fs.readFile(jsonFile, (err, content) => {
      if (err) return console.log(err)
      const contentJSON = JSON.parse(content)
      checkIfExists(contentJSON).then(function(result) {
        const user = contentJSON.users.find(x => x.email === email)
        if (result) {
          if (user.password === password) {
            req.session.user = user
            res.send("logged in")
          } else {
            res.send("wrong password")
          }
        } else {
          res.send("user doesnt exist")
        }
      })
    })

    async function checkIfExists(data) {
      //checks if the user allready exists in the database
      let exists = false
      const correspondingData = data.users.find(x => x.email === email)
      if (correspondingData != undefined) {
        exists = true
      }
      return exists
    }
  }
}

module.exports = dataManager;