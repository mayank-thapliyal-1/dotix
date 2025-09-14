import { create } from 'zustand'
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"
import { auth,db } from "./firebase"
export const useUSerStore = create((set) => ({
currentUser: null,
   fetchUser: ()=>{ 
     onAuthStateChanged(auth,async(user)=>{
          if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userInfo = docSnap.data();
          set({ currentUser: userInfo });
        } else {
          set({ currentUser: null});
        }
      } else {
        set({ currentUser: null});
      }
    })}
}))