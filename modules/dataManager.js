const fs = require('fs')
const jsonFile = './data/foodLove.json'
const argon2 = require('argon2')

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

    argon2.hash(password).then(processData)

    async function processData(hash) {

      fs.readFile(jsonFile, (err, content) => {
        if (err) return console.log(err)
        const contentJSON = JSON.parse(content)
        insertData(contentJSON)
      })

      function insertData(data) {
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
          hash
        }
        data.users.push(newUserData)
        fs.writeFile(jsonFile, JSON.stringify(data), err => {
          if (err) console.log(err)
        })
      }
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
      dataManager.checkIfExists(req, res, contentJSON).then(function(result) {
        const user = contentJSON.users.find(x => x.email === email)
        if (result) {
          argon2.verify(user.hash, password).then(verified)
        } else {
          res.send("user doesnt exist")
        }
      })
    })

    function verified(match) {
      if (match) {
        req.session.user = match
        res.send("logged in")
      } else {
        res.send("wrong password")
      }
    }
  },

  checkIfExists: async function(req, res, data) {
    const email = req.body.email
    if (typeof data === "object") {
      //checks if the user allready exists in the database
      let exists = false
      const correspondingData = data.users.find(x => x.email === email)
      if (correspondingData != undefined) {
        exists = true
      }
      return exists
    } else {
      fs.readFile(jsonFile, (err, content) => {
        if (err) return console.log(err)
        const contentJSON = JSON.parse(content)
        check(contentJSON).then(function(result) {
          console.log(result)
          if (result === true) {
            res.send("that email is already in use")
          } else {
            res.send({
              status: 200
            })
          }
        })
      })
      //checks if the user allready exists in the database
      async function check(data) {
        let exists = false
        const correspondingData = data.users.find(x => x.email === email)
        if (correspondingData != undefined) {
          exists = true
        }
        return exists
      }
    }
  }
}

module.exports = dataManager;