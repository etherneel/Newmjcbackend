
import planModel from "../models/plan_buy.model.js";
import userDetailModel from "../models/userdetails.model.js";
import userChainModel from "../models/users_chain.model.js";

let plan_post_controller = async(req,res) =>{
    try {
        let parent_details = await userDetailModel.findOne({address:req.body.parent_wallet_id});
        if(!parent_details){
             return res.send({message : "Please give a valid reffrals details" })
        }
        let value = req.body.buyed_plan[0].amount
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
            let ParentAmountObject1 = await planModel.findOne({user_wallet:req.body.parent_wallet_id})
            let parentMaxObject1= ParentAmountObject1.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject1.buyed_plan[0] )
            if(Number(parentMaxObject1.amount) >= Number(value)){
                await res1.updateOne( {$inc:{bonus : value*0.5} , details:[...res1.details , { amount : value*0.5 , level:1 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res1.updateOne( {$inc:{bonus : value*0.5} , details:[...res1.details , { amount : value*0.5 , level:1 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res2 = await userChainModel.findOne({address : res1.refferralBy }) ;
            if(!res2){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"}) ;
            }
            let ParentAmountObject2 = await planModel.findOne({user_wallet:res1.refferralBy})
            let parentMaxObject2= ParentAmountObject2.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject2.buyed_plan[0] )
            if(Number(parentMaxObject2.amount) >= Number(value)){
                await res2.updateOne( {$inc:{bonus : value*0.2} , details:[...res2.details , { amount : value*0.2 , level:2 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res2.updateOne( {$inc:{bonus : value*0.2} , details:[...res2.details , { amount : value*0.2 , level:2 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res3 = await userChainModel.findOne({address : res2.refferralBy }) ;
            if(!res3){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject3 = await planModel.findOne({user_wallet:res2.refferralBy})
            let parentMaxObject3= ParentAmountObject3.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject3.buyed_plan[0] )
            if(Number(parentMaxObject3.amount) >= Number(value)){
                await res3.updateOne( {$inc:{bonus : value*0.1} , details:[...res3.details , { amount : value*0.1 , level:3 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res3.updateOne( {$inc:{bonus : value*0.1} , details:[...res3.details , { amount : value*0.1 , level:3 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res4 = await userChainModel.findOne({address : res3.refferralBy })
            if(!res4){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject4 = await planModel.findOne({user_wallet:res3.refferralBy})
            let parentMaxObject4= ParentAmountObject4.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject4.buyed_plan[0] )
            if(Number(parentMaxObject4.amount) >= Number(value)){
                await res4.updateOne( {$inc:{bonus : value*0.05} , details:[...res4.details , { amount : value*0.05 , level:4 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res4.updateOne( {$inc:{bonus : value*0.05} , details:[...res4.details , { amount : value*0.05 , level:4 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res5 = await userChainModel.findOne({address : res4.refferralBy })
            if(!res5){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject5 = await planModel.findOne({user_wallet:res4.refferralBy})
            let parentMaxObject5= ParentAmountObject5.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject5.buyed_plan[0] )
            if(Number(parentMaxObject5.amount) >= Number(value)){
                await res5.updateOne( {$inc:{bonus : value*0.05} , details:[...res5.details , { amount : value*0.05 , level:5 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res5.updateOne( {$inc:{bonus : value*0.05} , details:[...res5.details , { amount : value*0.05 , level:5 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res6 = await userChainModel.findOne({address : res5.refferralBy })
            if(!res6){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject6 = await planModel.findOne({user_wallet:res5.refferralBy})
            let parentMaxObject6= ParentAmountObject6.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject6.buyed_plan[0] )
            if(Number(parentMaxObject6.amount) >= Number(value)){
                await res6.updateOne( {$inc:{bonus : value*0.04} , details:[...res6.details , { amount : value*0.04 , level:6 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res6.updateOne( {$inc:{bonus : value*0.04} , details:[...res6.details , { amount : value*0.04 , level:6 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res7 = await userChainModel.findOne({address : res6.refferralBy })
            if(!res7){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject7 = await planModel.findOne({user_wallet:res6.refferralBy})
            let parentMaxObject7= ParentAmountObject7.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject7.buyed_plan[0] )
            if(Number(parentMaxObject7.amount) >= Number(value)){
                await res7.updateOne( {$inc:{bonus : value*0.03} , details:[...res7.details , { amount : value*0.03 , level:7 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res7.updateOne( {$inc:{bonus : value*0.03} , details:[...res7.details , { amount : value*0.03 , level:7 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }

            let res8 = await userChainModel.findOne({address : res7.refferralBy })
            if(!res8){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 7) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject8 = await planModel.findOne({user_wallet:res7.refferralBy})
            let parentMaxObject8= ParentAmountObject8.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject8.buyed_plan[0] )
            if(Number(parentMaxObject8.amount) >= Number(value)){
                await res8.updateOne( {$inc:{bonus : value*0.02} , details:[...res8.details , { amount : value*0.02 , level:8 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res8.updateOne( {$inc:{bonus : value*0.02} , details:[...res8.details , { amount : value*0.02 , level:8 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res9 = await userChainModel.findOne({address : res8.refferralBy })
            if(!res9){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 1) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject9 = await planModel.findOne({user_wallet:res8.refferralBy})
            let parentMaxObject9= ParentAmountObject9.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject9.buyed_plan[0] )
            if(Number(parentMaxObject9.amount) >= Number(value)){
                await res9.updateOne( {$inc:{bonus : value*0.01} , details:[...res9.details , { amount : value*0.01 , level:9 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res9.updateOne( {$inc:{bonus : value*0.01} , details:[...res9.details , { amount : value*0.01 , level:9 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
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
            let ParentAmountObject1 = await planModel.findOne({user_wallet:req.body.parent_wallet_id})
            let parentMaxObject1= ParentAmountObject1.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject1.buyed_plan[0] )
            if(Number(parentMaxObject1.amount) >= Number(value)){
                await res1.updateOne( {$inc:{bonus : value*0.5} , details:[...res1.details , { amount : value*0.5 , level:1 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res1.updateOne( {$inc:{bonus : value*0.5} , details:[...res1.details , { amount : value*0.5 , level:1 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res2 = await userChainModel.findOne({address : res1.refferralBy }) ;
            if(!res2){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"}) ;
            }
            let ParentAmountObject2 = await planModel.findOne({user_wallet:res1.refferralBy})
            let parentMaxObject2= ParentAmountObject2.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject2.buyed_plan[0] )
            if(Number(parentMaxObject2.amount) >= Number(value)){
                await res2.updateOne( {$inc:{bonus : value*0.2} , details:[...res2.details , { amount : value*0.2 , level:2 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res2.updateOne( {$inc:{bonus : value*0.2} , details:[...res2.details , { amount : value*0.2 , level:2 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res3 = await userChainModel.findOne({address : res2.refferralBy }) ;
            if(!res3){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject3 = await planModel.findOne({user_wallet:res2.refferralBy})
            let parentMaxObject3= ParentAmountObject3.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject3.buyed_plan[0] )
            if(Number(parentMaxObject3.amount) >= Number(value)){
                await res3.updateOne( {$inc:{bonus : value*0.1} , details:[...res3.details , { amount : value*0.1 , level:3 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res3.updateOne( {$inc:{bonus : value*0.1} , details:[...res3.details , { amount : value*0.1 , level:3 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res4 = await userChainModel.findOne({address : res3.refferralBy })
            if(!res4){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject4 = await planModel.findOne({user_wallet:res3.refferralBy})
            let parentMaxObject4= ParentAmountObject4.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject4.buyed_plan[0] )
            if(Number(parentMaxObject4.amount) >= Number(value)){
                await res4.updateOne( {$inc:{bonus : value*0.05} , details:[...res4.details , { amount : value*0.05 , level:4 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res4.updateOne( {$inc:{bonus : value*0.05} , details:[...res4.details , { amount : value*0.05 , level:4 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res5 = await userChainModel.findOne({address : res4.refferralBy })
            if(!res5){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject5 = await planModel.findOne({user_wallet:res4.refferralBy})
            let parentMaxObject5= ParentAmountObject5.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject5.buyed_plan[0] )
            if(Number(parentMaxObject5.amount) >= Number(value)){
                await res5.updateOne( {$inc:{bonus : value*0.05} , details:[...res5.details , { amount : value*0.05 , level:5 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res5.updateOne( {$inc:{bonus : value*0.05} , details:[...res5.details , { amount : value*0.05 , level:5 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res6 = await userChainModel.findOne({address : res5.refferralBy })
            if(!res6){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject6 = await planModel.findOne({user_wallet:res5.refferralBy})
            let parentMaxObject6= ParentAmountObject6.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject6.buyed_plan[0] )
            if(Number(parentMaxObject6.amount) >= Number(value)){
                await res6.updateOne( {$inc:{bonus : value*0.04} , details:[...res6.details , { amount : value*0.04 , level:6 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res6.updateOne( {$inc:{bonus : value*0.04} , details:[...res6.details , { amount : value*0.04 , level:6 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res7 = await userChainModel.findOne({address : res6.refferralBy })
            if(!res7){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject7 = await planModel.findOne({user_wallet:res6.refferralBy})
            let parentMaxObject7= ParentAmountObject7.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject7.buyed_plan[0] )
            if(Number(parentMaxObject7.amount) >= Number(value)){
                await res7.updateOne( {$inc:{bonus : value*0.03} , details:[...res7.details , { amount : value*0.03 , level:7 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res7.updateOne( {$inc:{bonus : value*0.03} , details:[...res7.details , { amount : value*0.03 , level:7 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }

            let res8 = await userChainModel.findOne({address : res7.refferralBy })
            if(!res8){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj] , reffrals:(parent_details.reffrals + 7) })
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject8 = await planModel.findOne({user_wallet:res7.refferralBy})
            let parentMaxObject8= ParentAmountObject8.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject8.buyed_plan[0] )
            if(Number(parentMaxObject8.amount) >= Number(value)){
                await res8.updateOne( {$inc:{bonus : value*0.02} , details:[...res8.details , { amount : value*0.02 , level:8 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res8.updateOne( {$inc:{bonus : value*0.02} , details:[...res8.details , { amount : value*0.02 , level:8 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
            }
            let res9 = await userChainModel.findOne({address : res8.refferralBy })
            if(!res9){
                await parent_details.updateOne({total_profit:[...parent_details.total_profit , obj]})
                return res.send({message:"plane successfully buyed"})
            }
            let ParentAmountObject9 = await planModel.findOne({user_wallet:res8.refferralBy})
            let parentMaxObject9= ParentAmountObject9.buyed_plan.reduce((max , cv) => (parseInt(cv.amount , 10) > parseInt(max.amount , 10) ? cv : max) , ParentAmountObject9.buyed_plan[0] )
            if(Number(parentMaxObject9.amount) >= Number(value)){
                await res9.updateOne( {$inc:{bonus : value*0.01} , details:[...res9.details , { amount : value*0.01 , level:9 , wallet_address: req.body.user_wallet , user_id : req.body.user_id , time : new Date()}]}) ;
            }else{
                await res9.updateOne( {$inc:{bonus : value*0.01} , details:[...res9.details , { amount : value*0.01 , level:9 , wallet_address: req.body.user_wallet ,status:"Missed", user_id : req.body.user_id , time : new Date()}]}) ;
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