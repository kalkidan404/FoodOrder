//insert food:, delete food,update food
const prisma=require("../config/prisma");
const insertFood=async(req ,res ,next)=>{
    try{
const {name,description,Image,price,restaurantId}=req.body;
const food=await prisma.Food.create({
    data:{
        name:name,
        description:description,
        price:Number(price),
        Image:Image,
        restaurant:{
            connect:{
                id:Number(restaurantId)
            }
        }
    }
})
res.status(201).json({message:"food created succesfully",food})
    }catch(error){
next(error);
    }
}
const deleteFood=async(req ,res , next)=>{
    try{
       const foodId=Number(req.params.id);
       const Food=await prisma.Food.findUnique({
        where:{
            id:foodId
        }
       });
       if(!Food){
       return res.status(404).json({message:"food not found"});
       }
       await prisma.Food.delete({
        where:{
            id:foodId,
        }
       })
      return res.status(200).json({message:"food deleted successfully"})
    }catch(error){
        next(error);
    }
}
const updateFood=async(req , res , next)=>{
    try{
        
        const foodId=Number(req.params.id);
       const Food=await prisma.Food.findUnique({
        where:{
            id:foodId
        }
       });
       if(!Food){
       return res.status(404).json({message:"food not found"});
       }
       const {name,description,Image,price,restaurantId}=req.body;
       const updateFood= await prisma.Food.update({
            where:{
                id:foodId,
            },
    data:{
        name:name,
        description:description,
        price:Number(price),
        Image:Image,
        restaurant:{
            connect:{
                id:Number(restaurantId)
            }
        }
    }
})
return res.status(200).json({message:"updated succesfully",food:updateFood})
    }catch(error){
        next(error);
    }
}

const getFoods = async (req, res, next) => {
  try {
    const foods = await prisma.Food.findMany({
      include: {
        restaurant: true
      }
    });

    return res.status(200).json({ foods });
  } catch (error) {
    next(error);
  }
};

module.exports={insertFood,deleteFood,updateFood, getFoods};