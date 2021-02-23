const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const createUser = async(req, res) => {

    const { email, password } = req.body

    try {
        // const user = new User(req.body)
        // await user.save()
        let user = await User.findOne({ email })
        if( user ){
            
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            }) 
        }

        user = new User(req.body)

        //encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt)

        await user.save()

        const token = await generateJWT( user.id, user.name )

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please call the admin',
        })
    }
}
const loginUser = async(req, res) => {
    const { email, password } = req.body
    
    try {

        const user = await User.findOne({ email })
        if( !user ){
            
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con este correo',
            }) 
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if( !validPassword ){
            
            return res.status(400).json({
                ok: false,
                msg: 'Invalid password',
            }) 
        }

        const token = await generateJWT( user.id, user.name )

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please call the admin',
        })
    }
}
const renewUser = async(req, res) => {

    const uid = req.uid
    const name = req.name

    const token = await generateJWT( uid , name)
    res.json({
        ok: true,
        token,
        uid,
        name
    })
}

module.exports = {
    createUser,
    loginUser,
    renewUser
}