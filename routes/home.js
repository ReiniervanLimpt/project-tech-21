// Render home page
function home(req, res) {
  res.render('home.hbs', {
    title: "title"
  });
}

module.exports = home