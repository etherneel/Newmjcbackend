import mongoose from "mongoose";
import helper from "../commonHelper/helper.js";

let userSchema = new mongoose.Schema({
    address : helper.reqString,
    user_id : helper.reqNumber
}
)

let userModel = mongoose.model('users_details' , userSchema);

export default userModel