const dataManager = require('../modules/datamanager.js')

async function login(req, res) {
  dataManager.logIn(req, res)
}

module.exports = login;