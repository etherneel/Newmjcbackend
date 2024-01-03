import mongoose from "mongoose";
import helper from "../commonHelper/helper.js";

let stackSchema = new mongoose.Schema({
    user_id : helper.reqNumber,
    tokensteck_amount :helper.reqNumber
},
{
    timestamps:true,
}
)

let stackModel = mongoose.model('stack_details' , stackSchema);

export default stackModel