import { Router } from "express";
import { get_steck_amount, post_steck_amount } from "../controllers/stack.controller.js";

let steck_router = Router();

steck_router.post('/post-token' , post_steck_amount)
steck_router.get('/get-token' , get_steck_amount)

export default steck_router ;