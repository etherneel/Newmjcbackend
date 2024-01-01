import mongoose from "mongoose"
import helper from "../commonHelper/helper.js"

const profileSchema=new mongoose.Schema({
   // user_id : helper.reqNumber,
    profile : helper.reqString,
    //user_name : helper.reqString
})

const profileModel=mongoose.model("profile",profileSchema)

export default profileModel