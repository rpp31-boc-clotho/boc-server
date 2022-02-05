require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.port || 3000

const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const server = app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

module.exports = {
  app: app,
  server: server
};