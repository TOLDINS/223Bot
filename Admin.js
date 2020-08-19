const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    chat_id:String,
    permission:{
        type:Boolean,
        default:true
    },
    first_name:String,
    last_name:String

})
module.exports=mongoose.model('admins',UserSchema);