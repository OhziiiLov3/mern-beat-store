const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
name: { type: String, required: true},
email: { type: String, required: true, unique:true, trim: true, lowercase: true},
password: { type: String, required: true, trim: true, minLength: 3,},
isAdmin: {type: Boolean, default: false}
},{
    timestamps: true,
    toJson:{
        transform: (doc, ret)=>{
            delete ret.password // Removes the password from API responses to avoid exposing sensitive information.
            return ret;
        }
    }
});

// (middleware) to save operation to hash the user's password before it is saved to the database.
userSchema.pre('save', async function(next){
if(!this.isModified('password')) return next();
// update password with computed hash
this.password = await bcrypt.hash(this.password,SALT_ROUNDS)
})




module.exports = mongoose.model('User', userSchema);