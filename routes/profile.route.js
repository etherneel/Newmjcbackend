import { Router } from "express";
import uploadHelper from "../commonHelper/upload.helper.js";
import { profile_upload_controller } from "../controllers/profile.controller.js";
import profileModel from "../models/profile.model.js";
let profile_router = Router();

profile_router.post('/upload' ,uploadHelper , async (req,res) => {
    console.log(req.binary)
      try {
        
        let profile = new profileModel({profile:`http://localhost:3200/user-profile/${req.file.filename}` });
        await profile.save();
        res.send({
            "status":"Sucusess",
            data:{
                link:`http://localhost:3200/user-profile/${req.file.filename}`,
                user_name:req.user_name
            }
        })
      } catch (error) {
        console.log(error);
      }
      
    })

export default profile_router ;