const mongoose = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')

// the user schema to save the user in the database
const userSchema = new mongoose.Schema({

email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
        
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
   
    image: {
        type:String
    },
    birthday: {
        type:String
    }
}, {timestamps: true})

//function to hash user password before being saved to the database
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()

})

//function to find a profile via email and compare the supplied password with the hashed password before logging the user in
userSchema.statics.login = async function (email,password) {
    const user = await this.findOne({email})

    if(user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}


const User = mongoose.model('User', userSchema)

//function to validate user input
const validateUser = (user) =>{
    const schema = Joi.object({
        email: Joi.string().email().required()
        .messages({"string.empty": "Email cannot be empty",
                   "string.email": "Email must be Valid"
    }),
    password: Joi.string().required().min(6)
        .messages({"string.empty": "password cannot be less than 6 characters",
                    "string.min": "password cannot be less than 6 characters"
    }),
        firstname: Joi.string().required()
        .messages({"string.empty": "Name cannot be empty"}),
        lastname: Joi.string().required()
        .messages({"string.empty": "Name cannot be empty"}),       
        image: Joi.string(),
        birthday: Joi.string()
    })
    return schema.validate(user)
}

module.exports = {
    User,
    validateUser
}
