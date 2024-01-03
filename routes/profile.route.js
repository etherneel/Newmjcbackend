import { Router } from "express";
import uploadHelper from "../commonHelper/upload.helper.js";
import { profile_upload_controller } from "../controllers/profile.controller.js";
import profileModel from "../models/profile.model.js";
let profile_router = Router();

profile_router.post('/upload' ,uploadHelper , async (req,res) => {

      try {
        
        let profile = new profileModel({ user_id : req.query.user_id , address : req.query.address , profile:`http://localhost:3200/profile/${req.file.filename}`});
        await profile.save();
        res.send({
            "status":"Sucusess",
            data:{
                link:`http://localhost:3200/profile/${req.file.filename}`,
                user_name:req.user_name
            }
        })
      } catch (error) {
        console.log(error);
      }
      
})

profile_router.get('/user-profile' ,async function(req, res) {
    try {
      let data = await profileModel.findOne({$or:[{address:req.query.address} , {user_id:req.query.user_id}]})
      res.send({message: "this is profile" , data : data})
    } catch (error) {
      console.log(error)
    }
})

export default profile_router ;