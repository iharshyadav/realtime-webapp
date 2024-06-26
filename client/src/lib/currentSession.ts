import User from "@/app/models/user.schema";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

export async function getSession(){
     return await getServerSession(authOptions);
}


export default async function getCurrentUser() {
   try {
    const session = await getSession();

    if(!session?.user?.email){
        return null;
    }

    const currentUser = await User.findOne({email : session?.user?.email as string})

    if(!currentUser){
        return null;
    }

    return {
        currentUser
    };

   } catch (error:any) {

     return error;
     
   }
}