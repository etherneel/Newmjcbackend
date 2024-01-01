import planModel from "../models/plan_buy.model.js";
import userModel from "../models/user.model.js";
import userDetailModel from "../models/userdetails.model.js";

let users_controller = async (req,res)=>{
     try {
         let index = await userModel.find()
         let flag  = await userModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]})
         let user_details = await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]})
         if(!flag && !user_details){
            let _id = index[index.length-1]; 
            let id = _id.user_id + 1;
            let details = new userDetailModel({address:req.body.address , user_id:id});
            let user = new userModel({...req.body , user_id:id})
            await user.save();
            await details.save();
            let newUserId = await userModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]})
            return res.send({message:"user saved successfully and its  details is also filled" , data :newUserId })
         }else if(!user_details){
            let details = new userDetailModel({address:req.body.address , user_id:flag.user_id});
            await details.save();
            return res.send({message:"user details updated successfully"})
         }
        return res.send({message:"user is persent" , data:flag})
     } catch (error) {
        return console.error(error);
     }
}




let users_getAllDetails_controller = async (req,res)=>{
    console.log(req.body )
    try {
       
        let flag  = await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}] , 'total_profit':{ $gt: {'time': new Date(Date.now() - 24*60*60 * 1000) }}})
        let total = await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]});
        let total_sum = total.total_profit.reduce((acc,cv)=> acc + cv.profit , 0);
        let arr = flag.total_profit
        let sum = arr.reduce((acc,cv)=> acc + cv.profit , 0);
        let response = {
            total_profit:total_sum,
            recent_profit : sum,
            recent_reffrals : arr.length,
            total_reffrals : arr.length,
            user_id : flag.user_id,
            wallet_address : flag.address,
            parent_address : flag.parent_wallet_address
        }
        return res.send({message:"user is found successfully" , data : response })
    } catch (error) {
       return console.error(error);
    }
}

export  {users_controller , users_getAllDetails_controller }