// Render home page
function home(req, res) {
  res.render('home.hbs', {
    title: "hello world"
  });
}

module.exports = home