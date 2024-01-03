import stackModel from "../models/stack.model.js";

const post_steck_amount = async (req,res) =>{
    try {
        let steck = new stackModel({...req.body})
        await steck.save();
        return res.send({message:"saved data of token steck" })
    } catch (error) {
        console.log(error)
    }
}


const get_steck_amount = async (req, res) =>{
    try {
        let  flag = await stackModel.find({user_id:req.query.user_id});
        let total_amount = flag.reduce((acc,cv)=> acc + cv.tokensteck_amount , 0);
        let response = {
            total:total_amount,
            table_data:flag
        }
        return res.send({message:"All data is fetched successfully" , data:response});
    } catch (error) {
        console.log(error);
    }
}

export { post_steck_amount , get_steck_amount } ;