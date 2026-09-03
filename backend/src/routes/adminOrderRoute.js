const express=require("express");
const route=express.Router();
const {getALLorders,getorder,statusupdate}=require("../controller/adminOrderController");
const auth=require("../middleware/auth");
const adminAuth=require("../middleware/adminMiddleware");
route.get("/",auth,adminAuth,getALLorders);
route.get("/:id",auth,adminAuth,getorder);
route.put("/:id",auth,adminAuth,statusupdate);
module.exports=route;