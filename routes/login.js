const dataManager = require('../modules/dataManager.js')

async function login(req, res) {
  dataManager.logIn(req, res)
}

module.exports = login;