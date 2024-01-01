import { Router } from "express";
import {users_controller, users_getAllDetails_controller} from "../controllers/user.controller.js";

let userroute = Router();
 
userroute.post('/user' , users_controller)
userroute.post('/alldetails' , users_getAllDetails_controller)

export default userroute;