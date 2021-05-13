const dataManager = require('../modules/datamanager.js')

// Render registration page
function register(req, res) {
  // a check to see if any body data has been sent through a POST
  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.render('registration.hbs', {
      // possible data for user here
    })
  } else {
    dataManager.createUser(req, res)
    //store a state to keep track of what the user just did
    req.session.registered = true

    res.redirect('/')
  }
}

module.exports = register