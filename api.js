const Admin=require('./Admin');
async function checkPermission(chat_id){
    let candidate=await Admin.findOne({chat_id});
    return(candidate!==null)?true:false

}
async function getAllUserChatId(){
 
    
    let all_user=await Admin.find().select({
        chat_id:1
    });
    let result=all_user.map(s=> s.chat_id);
    return result;

}


module.exports={
    checkPermission,
    getAllUserChatId
}