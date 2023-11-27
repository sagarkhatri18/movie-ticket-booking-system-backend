var router = require('express').Router()
var accountController = require('../controllers/account.controller')

router.post('/login', accountController.login)

module.exports = router