const express = require('express')
const path = require('path')

const router = express.Router();

  router.get('/', (req, res)=>{
    res.sendFile('/views/index.html', {root: 'src'})
  })

  module.exports = router