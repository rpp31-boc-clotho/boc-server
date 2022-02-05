const mongoose = require('mongoose');
require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${process.env.auth}@${process.env.mongoIp}/fileStreamer`);
}