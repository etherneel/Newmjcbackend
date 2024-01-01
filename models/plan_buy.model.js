import mongoose from "mongoose";
import helper from "../commonHelper/helper.js";

let planSchema = new mongoose.Schema({
    user_wallet : helper.reqString,
    buyed_plan : helper.reqArray,
    parent_wallet_id : helper.reqString,
    user_id : helper.reqNumber 
},
{
    timestamps: true
}
)

let planModel = mongoose.model("plan_buy" , planSchema);

export default planModel ;