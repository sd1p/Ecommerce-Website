const mongoose = require('mongoose')
const validator= require('validator')
const bcrypt=require('bcryptjs')
const jwt= require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name."],
        maxLength:[30,"Name should not be more than 30 characters."],
        minLength:[4,"Name should b more than 4 characters."],
    },
    email:{
        type:String,
        required:[true,"Please enter your email."],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email."],
    },
    password:{
        type:String,
        required:[true,"Please enter a valid password."],
        minLength:[8,"Password should be more than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpireDate:Date,

})

userSchema.pre('save',async function(next) {
    if(!this.isModified('password'))
    {
        next();
    }
    this.password =await bcrypt.hash(this.password,12);
})

//JWT token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

//Compare password with bcrypt
userSchema.methods.comparePassword = async function(enteredPassword)
{
    return bcrypt.compare(enteredPassword,this.password)
}
module.exports= mongoose.model("User",userSchema)