
import planModel from "../models/plan_buy.model.js";
import userDetailModel from "../models/userdetails.model.js";

let plan_post_controller = async(req,res) =>{
    try {
        let parent_details = await userDetailModel.findOne({address:req.body.parent_wallet_id});
        let value = req.body.buyed_plan[0].amount
        //console.log(value)
        value = value - (value*(0.15))
        let profit = value*(0.5)
        let flag = await planModel.findOne({user_wallet:req.body.user_wallet , parent_wallet_id:req.body.parent_wallet_id});
        if(!flag){
            let user = new planModel({...req.body});
            await user.save()
            let obj = {
                time: new Date(),
                profit: profit,
                user_wallet: req.body.user_wallet,
                user_id: req.body.user_id
            }
            await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) }) ;
        }else{
            
            await flag.updateOne({buyed_plan:[...flag.buyed_plan , ...req.body.buyed_plan]}) ;
            let obj = {
                time: new Date() ,
                profit: profit,
                user_wallet: req.body.user_wallet,
                user_id: req.body.user_id
            }
            await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]}) ;
        }
        
        return res.send({message:"plane successfully buyed"})
    } catch (error) {
        console.log(error)
    }
} 

let plan_get_controller = async(req , res) =>{

    try {
        let flag = await planModel.find({parent_wallet_id:req.query.address})
        res.send({message:"data is fetchd" , data : flag})
    } catch (error) {
        console.log(error);
    }
}

let plan_get_byamount_controller = async(req , res) =>{
    try {
        let flag = await planModel.find({ parent_wallet_id:req.query.address , 'buyed_plan':{ $elemMatch : { 'amount': req.query.amount }}})
        res.send({ message:"data is fetchd" , data : flag })
    } catch (error) {
        console.log(error);
    }
}

let get_profit_by_user = async (req, res) => {
   try {
    let parent_details = await userDetailModel.findOne({$or:[{user_id:req.query.user_id} , {address:req.query.address}]});
    res.send({message : "All users profit is fetched successfully of this id" , data : parent_details.total_profit});
   } catch (error) {
     console.log(error);
   }
}

let plandelete = async (req, res) => {
    try {
        let data = await planModel.deleteMany({__v:0})
        res.send("delete")
    } catch (error) {
        console.log(error);
    }

}

export { plan_post_controller , plan_get_controller , plandelete , plan_get_byamount_controller , get_profit_by_user}