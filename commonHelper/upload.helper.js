import multer from "multer"

const uploadHelper=multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"./profiles")
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname+"_"+Date.now() +".png")
        }
    })
}).single("user_profile")

export default uploadHelper