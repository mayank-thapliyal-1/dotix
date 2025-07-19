import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

const fetchuser = ()=>{
    const user = onAuthStateChanged(auth,(user)=>{
        if(user){
            setCurrentUser(user);
        }
        else{
            console.log("no user found");
        }
    })
}