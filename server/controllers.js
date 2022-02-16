const { getUser } = require('./models');

module.exports = {
  getHomePageInfo: (req, res) => {

  },

  getLoggedInInfo: (req, res) => {

  },

  getUserDetails: (req, res) => {
    console.log(req.body.username);
    let username = req.body.username;

    getUser(username)
    .then((data) => {
      console.log('data', data);
      res.status(200).json(data);
    })
    .catch((err) => {console.log(err)})

  }
}