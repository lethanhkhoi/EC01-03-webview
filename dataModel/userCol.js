const database = require("../utils/database")
const  ObjectID = require('mongodb').ObjectId;
const userProperties = [
    "name",
    "password",
    "phone",
    "address",
    "gender",
    "birthday",
    "voucher",
    "role"
]
async function getAll(){
    return await database.userModel().find().toArray()
}
async function create(data){
    return await database.userModel().insertOne(data)
}
async function getDetailByCode (code){
    return await database.userModel().find({id : code})
}

async function getDetailByEmail (email){
    return await database.userModel().find({email})
}
async function update (code, data){
    data["updatedAt"] = new Date()
    const result= await database.userModel().findOneAndUpdate({id: code},
    {
        $set: data
    })
    return result.value
}
module.exports={
    getAll,
    create,
    update,
    getDetailByCode,
    getDetailByEmail,
    userProperties
}