import React from "react";
import { Avatar,AvatarImage } from "@radix-ui/react-avatar";
import { Popover,PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT} from '@/utils/constant'
import { useNavigate } from "react-router-dom";
import {setUser} from '@/redux/authSlice';
import {toast} from 'sonner'
import { LogOut,User2 } from "lucide-react";
import { Button } from "../ui/button";

const Navbar = ()=>{
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async()=>{
        try{
            const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCreadentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }

        }
        catch(error){
            console.log(error);
            TableRowsSplit.error(error.response.data.message);
        }
    }
 return (
   <div className="bg-white">
     <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
       <div>
         <h1 className="text-2xl font-bold">
           {" "}
           Hire<span className="text-[#F83002]">Sphere</span>
         </h1>
       </div>
       <div className="flex items-center gap-12">
         <ul className="flex font-medium items-center gap-5">
           {user && user.role === "recruiter" ? (
             <>
               <li> Comapnies</li>
               <li> Jobs</li>
             </>
           ) : (
             <>
               <li>Home</li>
               <li>Jbs</li>
               <li>Browse</li>
             </>
           )}
         </ul>
         {!user ? (
           <div>
             <Button variant="outline">Login</Button>
             <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">SignUp</Button>
           </div>
         ) : (
           <Popover>
             <PopoverTrigger asChild>
               <Avatar className="cursor-pointer">
                 <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
               </Avatar>
             </PopoverTrigger>
             <PopoverContent className="w-80">
               <div className="">
                 <div className="flex gap-2 space-y-2">
                   <Avatar className="cursor-pointer">
                     <AvatarImage
                       src={user?.profile?.profilePhoto}
                       alt="@shadcn"
                     />
                   </Avatar>
                   <div>
                     <h4 className="font-medium">{user?.fullname}</h4>
                     <p className="text-sm text-muted-foreground">
                       {user?.profile?.bio}
                     </p>
                   </div>
                 </div>
                 <div className="flex flex-col my-2 text-gray-600">
                   {user && user.role === "student" && (
                     <div className="flex w-fit items-center gap-2 cursor-pointer">
                       <User2 />
                       <Button variant="link">
                         {" "}
                         <Link to="/profile">View Profile</Link>
                       </Button>
                     </div>
                   )}

                   <div className="flex w-fit items-center gap-2 cursor-pointer">
                     <LogOut />
                     <Button onClick={logoutHandler} variant="link">
                       Logout
                     </Button>
                   </div>
                 </div>
               </div>
             </PopoverContent>
           </Popover>
         )}
       </div>
     </div>
   </div>
 );

}
export default Navbar;