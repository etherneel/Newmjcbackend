import express from 'express';
import connectoin from './config/connection.js';
import userroute from './routes/user.route.js';
import plan_buyRouter from './routes/plan_buy.route.js';
import cors from 'cors'
import profile_router from './routes/profile.route.js';
import steck_router from './routes/steck.route.js';
import userChainRouter from './routes/user_chain.route.js';
let app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('profiles'))
app.get('/' , (req , res)=>{
    console.log(new Date())
    res.send({message:"Hello welcome to the home page!"});
})

app.use('/v1', userroute);
app.use('/v1' , plan_buyRouter);
app.use('/profile',profile_router)
app.use('/steck' , steck_router)
app.use('/get' , userChainRouter)
app.use( '/profile' ,express.static('profiles'))
app.listen(3200 , async()=>{
    try {
        await connectoin
        console.log("connected to the database");
    } catch (error) {
        console.log(error)
    }
    console.log("we are live on the port of 3200") ;
})