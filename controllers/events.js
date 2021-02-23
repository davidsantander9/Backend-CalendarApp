const Event = require('../models/Event')

const getEvents = async(req, res) => {

    const events = await Event.find()
                                .populate('user', 'name')

    res.json({
        ok: true,
        events
    })
}

const createEvent = async(req, res) => {

    const event = new Event( req.body )
    try {   
        event.user = req.uid
        const eventSaved = await event.save()
        res.status(201).json({
            ok: true,
            eventSaved
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            req: 'Call the admin'
        })
    }
}

const updateEvent = async(req, res) => {

    const eventId =  req.params.id
    const uid = req.uid

    try {
    
        const event = await Event.findById( eventId )
        if( !event ){
            res.status(404).json({
                ok: false,
                msg: 'Event is not exit ' 
            })
        }

        if( event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'User can not edit this event ' 
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } )

        return res.json({
            ok: true,
            event: eventUpdated
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            req: 'Call the admin'
        })
    }
}


const deleteEvent = async(req, res) => {

    const eventId =  req.params.id
    const uid = req.uid

    try {
    
        const event = await Event.findById( eventId )
        if( !event ){
            res.status(404).json({
                ok: false,
                msg: 'Event is not exit ' 
            })
        }

        if( event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'User can not delete this event ' 
            })
        }


        await Event.findByIdAndRemove( eventId)

        return res.json({
            ok: true,
            msg: 'Event deleted'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            req: 'Call the admin'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}

