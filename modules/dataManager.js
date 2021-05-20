const fs = require('fs')
const argon2 = require('argon2')

const mongoose = require("mongoose")
const User = require("../models/user.js")

const dataManager = {
  createUser: function(req, res) {
    argon2.hash(req.body.password).then(processData)

    async function processData(hash) {
      const newUser = new User({
        name: req.body.name,
        birthdate: req.body.birthdate,
        sex: req.body.sex,
        cuisine: req.body.cuisine,
        preference: req.body.preference,
        location: req.body.location,
        bio: req.body.description,
        email: req.body.email,
        password: hash
      })
      newUser.save(function(error) {
        console.log(error)
      })
    }
  },


  logIn: async function(req, res) {
    const {
      email,
      password
    } = req.body

    const correspondingData = await User.findOne({
      email: email
    }).exec((error, data) => {
      if (error) {
        console.log(error)
      } else if (data) {
        argon2.verify(data.password, password).then(verified, data).then(function(result) {
          req.session.userData = data
          res.send(result)
        })
      } else {
        res.send("user doesnt exist")
      }
    })

    function verified(match) {
      if (match) {
        req.session.user = match
        return "logged in"
      } else {
        res.send("wrong password")
      }
    }
  },

  updateAccount: async function(req, res) {
    const filter = {
      email: req.session.userData.email
    }
    const updateData = await User.findOneAndUpdate(filter, req.body, {
      new: true
    }).exec((error, data) => {
      req.session.userData = data
      res.send("data has been updated")
    })
  },


  checkIfExists: async function(req, res) {
    const email = req.body.email

    const correspondingData = await User.findOne({
      email: email
    }).exec((error, data) => {
      if (error) {
        console.log(error)
      } else if (data) {
        res.send("that email is already in use")
      } else {
        res.send({
          status: 200
        })
      }
    })
  }
}

module.exports = dataManager;