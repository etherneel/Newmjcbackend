import { Router } from "express";
import get_user_chain from "../controllers/user_chain.controller.js";

let userChainRouter = Router();

userChainRouter.get('/chain' , get_user_chain)

export default userChainRouter;