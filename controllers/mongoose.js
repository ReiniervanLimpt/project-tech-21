const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@foodlove.i09d7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const mongoose = require('mongoose')

const mongooseConnect = async () => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })

    // some code to list collections from: https://stackoverflow.com/questions/19961387/trying-to-get-a-list-of-collections-from-mongoose
    // mongoose.connection.on('open', function(ref) {
    //   console.log('Connected to mongo server.')
    //   mongoose.connection.db.listCollections().toArray(function(err, names) {
    //     console.log(names)
    //     module.exports.Collection = names;
    //   })
    // })
  } catch (error) {
    console.log(error)
  }
}

module.exports = mongooseConnect