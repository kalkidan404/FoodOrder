//orderstatus-update, getallorder, getorder
const prisma=require("../config/prisma")
const getALLorders=async(req , res , next)=>{
    try{
      const orders=await prisma.order.findMany();
      if(orders.length===0){
        return res.status(404).json({message:"no orders yet"});
      }
      return res.status(200).json({ orders });
    }catch(error){
        next(error)
    }
}
const getorder=async(req,res,next)=>{
    try{
        const orderid=Number(req.params.id);
        const order=await prisma.Order.findUnique({
            where:{
                id:orderid
            }
        })
        if(!order){
            return res.status(404).json({message:"order not found"})
        }
      return  res.status(200).json({order});
    }catch(error){
        next(error);
    }
}
const statusupdate=async(req,res,next)=>{
    try{
         const orderid=Number(req.params.id);
         const {status}=req.body;
        const order=await prisma.Order.findUnique({
            where:{
                id:orderid
            }
        })
        if(!order){
            return res.status(404).json({message:"order not found"})
        }
        await prisma.Order.update({
            where:{
                id:orderid
            },
            data:{
                status:status
            }

        })
        return res.status(200).json({message:"update succesful"})
    }catch(error){
        next(error);
    }
}
module.exports={getALLorders,getorder,statusupdate}