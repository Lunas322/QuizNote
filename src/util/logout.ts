import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/firebase";

const auth = getAuth(app);

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};
