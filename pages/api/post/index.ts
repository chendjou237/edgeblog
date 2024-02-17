import { getServerSession } from "next-auth/next"
import prisma from "../../../lib/prisma";
import authHandler, { authOptions } from "../auth/[...nextauth]";

export default async function handle(req, res){
    try {
        const {title, content} = req.body;
    
        const session = await getServerSession(req, res, authOptions);
        console.log("session is ", session);

        const result = await prisma.post.create({
            data: {
               title: title, 
               content:  content, 
               author: {connect: {email: session?.user?.email}} 
            }
        })
        res.json(result)
    } catch (error) {
        console.error(error);
        
        res.status(500).json({error: error.message})
        
    }
   
}