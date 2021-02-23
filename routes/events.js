const { Router } = require('express')
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate') 
const { validateJWT } = require('../middlewares/jwt-validator')
const { fieldValidator } = require('../middlewares/field-validator')

const { 
    getEvents, 
    createEvent, 
    updateEvent, 
    deleteEvent } = require('../controllers/events')

const router = Router(  )

router.use( validateJWT )

router.get('/', 
    [
        
    ] ,getEvents)

router.post('/', 
    [
        check('title', 'Title is requiered').not().isEmpty(),
        check('start', 'Start date is requiered').custom( isDate ),
        check('end', 'Finish date is requiered').custom( isDate ),
        fieldValidator,
    ] ,createEvent)


router.put('/:id', 
    [

    ] ,updateEvent)


router.delete('/:id', 
    [

    ] ,deleteEvent)




module.exports = router
