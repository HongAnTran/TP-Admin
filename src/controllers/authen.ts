import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export  async function registerWithGoogleFirebase(): Promise<void> {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  } catch (error: any) {
    // Handle Errors here.
    const errorMessage = error.message;

    throw new Error(errorMessage);
  }
}
