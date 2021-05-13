// Render home page
function home(req, res) {
  let registered
  //if the user recently registered, this data is used to display the login form when redirecting to the home page ("/")
  if (req.session.registered) {
    registered = true
    req.session.registered = false
  }
  res.render('home.hbs', {
    title: "FoodLove",
    user: req.session.user,
    registered: registered
  })
  registered = false
}

module.exports = home