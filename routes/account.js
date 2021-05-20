const dataManager = require('../modules/dataManager.js')

// Render registration page
function account(req, res) {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    // a check to see if any body data has been sent through a POST
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      res.render('account.hbs', {
        user: req.session.user,
        data: req.session.userData,
        // registering a helper that can check data in the rendering process
        helpers: {
          ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
          }
        }
      })
    } else {
      dataManager.updateUser(req, res)
    }
  }
}

module.exports = account