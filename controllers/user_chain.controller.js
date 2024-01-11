import userChainModel from "../models/users_chain.model.js";

let get_user_chain = async (req , res) => {
    try {
        let user = await userChainModel.findOne({address: req.query.address})
        if(!user) {
            return res.send({message : "User is not found"})
        }
        return res.send({ message : "User is fetched" , data:user })
    } catch (error) {
        console.log(error);
    }
}

export default get_user_chain