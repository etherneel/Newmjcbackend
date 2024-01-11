import userModel from "../models/user.model.js";
import userDetailModel from "../models/userdetails.model.js";

let users_controller = async (req,res)=>{
     try {
         let index = await userModel.find()
         let flag  = await userModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]})
         let user_details = await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]})
         if(!flag && !user_details){
            let id
            if(index.length > 0){
               let _id = index[index.length-1]; 
                id = _id.user_id + 1;
            }else{
               id=0
            }
            let details = new userDetailModel({address:req.body.address , user_id:id});
            let user = new userModel({...req.body , user_id:id})
            await user.save();
            await details.save();
            let newUserId = await userModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]})
            return res.send({message:"user saved successfully and its  details is also filled" , data :newUserId })
         }else if(!user_details){
            let details = new userDetailModel({address:req.body.address , user_id:flag.user_id});
            await details.save();
            return res.send({message:"user details updated successfully" , data : flag})
         }
        return res.send({message:"user is persent" , data:flag})
     } catch (error) {
        return console.error(error);
     }
}

let get_user_details_who_buy_plan = async (req, res) => {
   try {
      let total = await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]});
      if(total.total_profit.length===0){
         return res.send({message: "data is persent" , data:{total_profit:0 , recent_profit:0 , recent_reffrals:0 , user_id:total.user_id , wallet_address:total.address , parent_address : total.parent_wallet_address}})
      }
  } catch (error) {
     return console.error(error);
  }
}


let users_getAllDetails_controller = async (req,res)=>{
    try {
        let total = await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]});
        if(!total){
          let userIs= await userModel.findOne({user_id:req.body.user_id});
          if(!userIs){
            return res.send({message : "user is Not found"})
          }
          let resp = new userDetailModel({user_id : req.body.user_id , address:userIs.address});
          await resp.save();
          let userdetails = await userDetailModel.findOne({user_id:req.body.user_id});
          return res.send({message : "User is found successfully " , data:userdetails})
        }
        
        if(total.total_profit.length===0){
           return res.send({message: "data is persent" , data:{total_profit:0 , recent_profit:0 , recent_reffrals:0 , user_id:total.user_id , wallet_address:total.address , parent_address : total.parent_wallet_address}})
        }
        let flag  = await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}] , 'total_profit':{ $gt: {'time': new Date(Date.now() - 24*60*60 * 1000) }}})
        if( !flag){
         let resp=await userDetailModel.findOne({$or:[{address:req.body.address} , {user_id:req.body.user_id}]});
         return res.send({meesage:"No profit available" , data:resp})
        }
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