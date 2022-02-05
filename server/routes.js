const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', async (req, res) => {
  res.send('Hello World!')
});

module.exports = router;