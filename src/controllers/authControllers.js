const jwt = require('jsonwebtoken');
const multer = require('multer')
const {User} = require('../model/user')

// storage to save profile picture
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage: storage}).single('image');

//Function to handle errors
const handleErrors = (err) =>{
    console.log(err.message, err.code);
    let errors = { email: '', password:''}

    if(err.message === 'incorrect email'){
        errors.email = 'Email not registered'
    }

    if(err.message === 'incorrect password'){
        errors.password = 'Password is Incorrect'
    }

    if(err.code === 11000){
        errors.email = 'Email already taken'
        return errors
    }

    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}


const maxAge = 24 * 60 * 60

// Creating a token for each user after sign up or login
const createToken = (id)=>{
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: maxAge})
}

//function to sign up a new user
const signup_post = async (req, res)=> {
    try {
        const user = new User({
            email: req.body.email,
             password: req.body.password,
              firstname: req.body.firstname,
               lastname: req.body.lastname,
                image: req.file.path,
                 birthday: req.body.birthday
                })
                const token = createToken(user._id)
                res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})

                user.save((err, data)=>{
                    const errors = handleErrors(err)
                 if(err) return res.status(401).json({errors});
                 res.status(201).json({user: data})

                })
    
    } 
    catch (err){
        console.log(err)
      res.status(401).json({err})
    }
}
const signup_get = (req, res) =>{
    res.send('signup')
}

//function to log the user in
const login_post = async (req, res) =>{
    const {email, password} = req.body

    try {
        const user = await User.login(email,password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user})
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({errors})
        
    }
    
}
const login_get = (req, res) =>{
    res.send('login')
}

// function to log the user out and make the token expire almost immediately
const logout_get = (req,res) =>{
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}

// function to for user to get their profile information
const getUser = (req,res)=>{
    
    const user = User.findById(req.params.id)
    .then((result)=> {

         res.status(201).json({ users: result})
    })
    .catch((err)=> {
        console.log(err)
    })
 }

 //function for users to update their to update their profile information 
 const postEditUser = (req,res)=>{
    User.findOneAndUpdate({ _id: req.params.id}, req.body, {returnDocument: 'after'}, (err,doc)=>{
        if(doc) res.send(doc) 
        else { console.log(err)}
    })
   

}

//function for users to delete their profile
const deleteUser = (req,res)=> {
    User.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){res.send('User deleted')}
        else{console.log(err)}
    })
}


module.exports = {
    signup_post,
    signup_get,
    uploadImg,
    login_post,
    login_get,
    logout_get,
    getUser,
    postEditUser,
    deleteUser
}