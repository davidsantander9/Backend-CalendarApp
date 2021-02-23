/*
    Rutas de usuario / Auth
    host + /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { fieldValidator } = require('../middlewares/field-validator')
const { validateJWT } = require('../middlewares/jwt-validator')
const { createUser, loginUser, renewUser } = require('../controllers/auth')
const router = Router()

router.post('/new',
    [
        check('name', 'Name is requiered').not().isEmpty(),
        check('email', 'Email is requiered').isEmail(),
        check('password', 'Password shouldbe at least 6 characters').isLength({ min:6 }),
        fieldValidator
    ] 
    ,createUser)

router.post('/', 
    [
        check('email', 'Email is requiered').isEmail(),
        check('password', 'Password shouldbe at least 6 characters').isLength({ min:6 }),
        fieldValidator,

    ],loginUser)

router.get('/renew', validateJWT ,renewUser)

module.exports = router