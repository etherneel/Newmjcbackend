import mongoose from "mongoose";
import helper from "../commonHelper/helper.js";

let userChainSchema = new mongoose.Schema({
    address : helper.reqString,
    details: {type:Array , default : []},
    refferralBy : helper.reqString,
    user_id: helper.reqNumber,
    bonus : helper.reqNumber 
},
{
    timestamps: true
}
)

let userChainModel = mongoose.model("users_chain" , userChainSchema);

export default userChainModel ;