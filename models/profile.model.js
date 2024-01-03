import mongoose from "mongoose"
import helper from "../commonHelper/helper.js"

const profileSchema=new mongoose.Schema({
    user_id:helper.reqNumber,
    address:helper.reqString,
    profile : helper.reqString,
    
})

const profileModel=mongoose.model("profile",profileSchema)

export default profileModel