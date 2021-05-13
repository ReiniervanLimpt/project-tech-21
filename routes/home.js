// Render home page
function home(req, res) {
  let registered
  if (req.session.registered) {
    registered = true
    req.session.registered = false
  }
  res.render('home.hbs', {
    title: "hello world",
    user: req.session.user,
    registered: registered
  })
  registered = false
}

module.exports = home