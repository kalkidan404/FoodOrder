require("dotenv").config();
const {prismaclient}=require("../generated/prisma");
const {prismapg}=require("@prisma/adapter-pg")
const adapter=new prismapg({
    connectionString:process.env.DATABASE_URL
})
const prisma=new prismaclient({
    adapter
})
module.exports=prisma;