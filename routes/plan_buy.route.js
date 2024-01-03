import { Router } from "express";
import { get_profit_by_user, plan_get_byamount_controller, plan_get_controller, plan_post_controller  } from "../controllers/buy_plan.controller.js";

let plan_buyRouter = Router();

plan_buyRouter.post('/plan-buy' , plan_post_controller);
plan_buyRouter.get('/filter' , plan_get_controller);
plan_buyRouter.get('/filtering' , plan_get_byamount_controller)
plan_buyRouter.get('/profits' , get_profit_by_user)
export default plan_buyRouter;