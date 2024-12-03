import {auth} from "@/lib/firebase";
import {signInWithEmailAndPassword} from "firebase/auth";


export default async function signIn(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return {result, error};
}

export async function loginWithGithub() {
    // eslint-disable-next-line prefer-const
    let result = null,
        error = null;
    try {
        // result = await auth.createUserWithEmailAndPassword(email, password);
    } catch (e) {
        error = e;
    }

    return {result, error};
}