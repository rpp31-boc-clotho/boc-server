const mongoose = require('mongoose');
require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/streamFinder');
}