
import planModel from "../models/plan_buy.model.js";
import userDetailModel from "../models/userdetails.model.js";
import userChainModel from "../models/users_chain.model.js";

let plan_post_controller = async(req,res) =>{
    try {
        let parent_details = await userDetailModel.findOne({address:req.body.parent_wallet_id});
        let value = req.body.buyed_plan[0].amount
        let val = req.body.buyed_plan[0].amount
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
            let userchainflag = await userChainModel.findOne({address : req.body.user_wallet })
            if(!userchainflag){
                let userchain = new userChainModel({address:req.body.user_wallet , refferralBy:req.body.parent_wallet_id , bonus:0 , user_id:req.body.user_id})
                await userchain.save() ;
            }
            let res1 = await userChainModel.findOne({address : req.body.parent_wallet_id })
            if(!res1){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"}) ;
            }
            await res1.updateOne( {$inc:{bonus : val*0.5} , details:[...res1.details , { amount : val*0.5 , level:1 , user_id : req.body.user_id}]}) ;
            let res2 = await userChainModel.findOne({address : res1.refferralBy }) ;
            if(!res2){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"}) ;
            }
            await res2.updateOne( {$inc:{bonus : val*0.4}, details:[...res2.details , { amount : val*0.4 , level:2 , user_id : req.body.user_id}]}) ;
            let res3 = await userChainModel.findOne({address : res2.refferralBy }) ;
            if(!res3){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            await res3.updateOne( {$inc:{bonus : val*0.3} , details:[...res3.details , { amount : val*0.3 , level:3 , user_id : req.body.user_id}]})
            let res4 = await userChainModel.findOne({address : res3.refferralBy })
            if(!res4){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            await res4.updateOne( {$inc:{bonus : val*0.2} , details:[...res4.details , { amount : val*0.2 , level:4 , user_id : req.body.user_id}]})
            let res5 = await userChainModel.findOne({address : res4.refferralBy })
            if(!res5){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            await res5.updateOne( {$inc:{bonus : val*0.1}, details:[...res5.details , { amount : val*0.1 , level:5 , user_id : req.body.user_id}]})
            let res6 = await userChainModel.findOne({address : res5.refferralBy })
            if(!res6){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            await res6.updateOne( {$inc:{bonus : val*0.1}, details:[...res6.details , { amount : val*0.1 , level:6 , user_id : req.body.user_id}]})
            let res7 = await userChainModel.findOne({address : res6.refferralBy })
            if(!res7){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            await res7.updateOne( {$inc:{bonus : val*0.1}, details:[...res7.details , { amount : val*0.1 , level:7 , user_id : req.body.user_id}]})
     

            let res8 = await userChainModel.findOne({address : res7.refferralBy })
            if(!res8){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            await res8.updateOne( {$inc:{bonus : val*0.1}, details:[...res8.details , { amount : val*0.1 , level:8 , user_id : req.body.user_id}]})
            
            let res9 = await userChainModel.findOne({address : res8.refferralBy })
            if(!res9){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            await res9.updateOne( {$inc:{bonus : val*0.1}, details:[...res9.details , { amount : val*0.1 , level:9 , user_id : req.body.user_id}]})

            await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) }) ;
        }else{

            await flag.updateOne({buyed_plan:[...flag.buyed_plan , ...req.body.buyed_plan]}) ;
            let obj = {
                time: new Date() ,
                profit: profit,
                user_wallet: req.body.user_wallet,
                user_id: req.body.user_id
            }
            let userchainflag = await userChainModel.findOne({address : req.body.user_wallet })
            if(!userchainflag){
                let userchain = new userChainModel({address:req.body.user_wallet , refferralBy:req.body.parent_wallet_id , bonus:0 , user_id:req.body.user_id})
                await userchain.save() ;
            }
            let res1 = await userChainModel.findOne({address : req.body.parent_wallet_id })
            if(!res1){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"}) ;
            }
            await res1.updateOne( {$inc:{bonus : val*0.5} , details:[...res1.details , { amount : val*0.5 , level:1 , user_id : req.body.user_id}]}) ;
            let res2 = await userChainModel.findOne({address : res1.refferralBy }) ;
            if(!res2){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"}) ;
            }
            await res2.updateOne( {$inc:{bonus : val*0.4}, details:[...res2.details , { amount : val*0.4 , level:2 , user_id : req.body.user_id}]}) ;
            let res3 = await userChainModel.findOne({address : res2.refferralBy }) ;
            if(!res3){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res3.updateOne( {$inc:{bonus : val*0.3} , details:[...res3.details , { amount : val*0.3 , level:3 , user_id : req.body.user_id}]})
            let res4 = await userChainModel.findOne({address : res3.refferralBy })
            if(!res4){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res4.updateOne( {$inc:{bonus : val*0.2} , details:[...res4.details , { amount : val*0.2 , level:4 , user_id : req.body.user_id}]})
            let res5 = await userChainModel.findOne({address : res4.refferralBy })
            if(!res5){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res5.updateOne( {$inc:{bonus : val*0.1}, details:[...res5.details , { amount : val*0.1 , level:5 , user_id : req.body.user_id}]})
            let res6 = await userChainModel.findOne({address : res5.refferralBy })
            if(!res6){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res6.updateOne( {$inc:{bonus : val*0.1}, details:[...res6.details , { amount : val*0.1 , level:6 , user_id : req.body.user_id}]})
            let res7 = await userChainModel.findOne({address : res6.refferralBy })
            if(!res7){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res7.updateOne( {$inc:{bonus : val*0.1}, details:[...res7.details , { amount : val*0.1 , level:7 , user_id : req.body.user_id}]})
     

            let res8 = await userChainModel.findOne({address : res7.refferralBy })
            if(!res8){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res8.updateOne( {$inc:{bonus : val*0.1}, details:[...res8.details , { amount : val*0.1 , level:8 , user_id : req.body.user_id}]})
            
            let res9 = await userChainModel.findOne({address : res8.refferralBy })
            if(!res9){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res9.updateOne( {$inc:{bonus : val*0.1}, details:[...res9.details , { amount : val*0.1 , level:9 , user_id : req.body.user_id}]})

            let res10 = await userChainModel.findOne({address : res9.refferralBy })
            if(!res10){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            await res10.updateOne( {$inc:{bonus : val*0.1}, details:[...res10.details , { amount : val*0.1 , level:10 , user_id : req.body.user_id}]})

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