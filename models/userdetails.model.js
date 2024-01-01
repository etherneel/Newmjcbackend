import mongoose from "mongoose";
import helper from "../commonHelper/helper.js";

let userDetailSchema = new mongoose.Schema({
    address : helper.reqString,
    user_id : helper.reqNumber,
    total_profit : {type:Array , default : [{time: new Date() , profit:0}]},
    refrrals:{type:Number , default : 0}
}
)

let userDetailModel = mongoose.model('users_all_details' , userDetailSchema);

export default userDetailModel