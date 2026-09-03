//getrestaurants, getrestaurant,removerestaurant,putrestaurant,updaterestaurant
const prisma=require("../config/prisma");
const createRestaurant=async(req ,res ,next)=>{
    try{
        const {name,description}=req.body;
         const check=await prisma.Restaurant.findFirst({
            where:{
                name:name,
            }
         })
         if(check){
            return res.status(403).json({message:"restaurant already exists"})
         }
        const restaurant=await prisma.Restaurant.create({
            data:{
                name:name,
                description:description,
            }
        })
        return res.status(201).json({message:"created restaurant",restaurant})
    }catch(error){
        next(error);
    }
}
const getrestaurants=async(req,res,next)=>{
    try{
        const restaurant=await prisma.Restaurant.findMany();
        if(restaurant.length===0){
            return res.status(404).json({message:"empty list"})
        }
        return res.status(200).json({restaurant});
    }catch(error){
        next(error);
    }
}
const getrestaurant=async(req,res,next)=>{
    try{
        const restaurantId=Number(req.params.id);
        const restaurant=await prisma.Restaurant.findUnique({
            where:{
                id:restaurantId
            }
        })
        if(!restaurant){
            return res.status(404).json({message:"restaurant not found"})
        }
        return res.status(200).json({restaurant});
    }catch(error){
        next(error);
    }
}
const updateRestaurant=async(req,res,next)=>{
    try{
        const restaurantId=Number(req.params.id);
        const {name,description}=req.body;
        const restaurant=await prisma.Restaurant.findUnique({
            where:{
                id:restaurantId
            }
        })
        if(!restaurant){
            return res.status(404).json({message:"restaurant not found"})
        }
          await prisma.Restaurant.update({
            where:{
                id:restaurantId
            },
            data:{
                name:name,
                description:description
            }
          })
          return res.status(200).json({message:"update succesful"})
    }catch(error){
        next(error)
    }
}
const removeRestaurant=async(req,res,next)=>{
    try{
        const restaurantId=Number(req.params.id);
        const restaurant=await prisma.Restaurant.findUnique({
            where:{
                id:restaurantId
            }
        })
        if(!restaurant){
            return res.status(404).json({message:"restaurant not found"})
        }
        await prisma.Restaurant.delete({
            where:{
                id:restaurantId
            }
        })
        return res.status(200).json({message:"deleted succesfully"})
    }catch(error){
        next(error)
    }
}
module.exports={createRestaurant,getrestaurants,getrestaurant,updateRestaurant,removeRestaurant}