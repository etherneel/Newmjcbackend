import uploadHelper from "../commonHelper/upload.helper.js";
import profileModel from "../models/profile.model.js";

const profile_upload_controller = async (req,res) => {
    //console.log(req)
      try {
        
        let profile = new profileModel({profile:`http://localhost:3200/user-profile/${req.file.filename}` , user_id:req.form.user_id , user_name:req.form.user_name});
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
}

export {profile_upload_controller}