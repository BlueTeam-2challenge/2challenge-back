const mongoose = require('mongoose')

async function main() {
  try {
    mongoose.connect(process.env.MONGODB_URI)
    mongoose.connection.on('open', () => {
      console.log('Connected to MongoDB')
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports = main
