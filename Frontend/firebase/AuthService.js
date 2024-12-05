import { auth } from "./firebase";

export const getIdToken = async () => {
    const user = auth.currentUser;
    
    if (user) {
        try {
            const idToken = await user.getIdToken(true);
            return idToken; 
        } catch (error) {
            console.error("Error fetching ID token: ", error);
            return null;
        }
    } else {
        console.error("User is not authenticated"); 
        return null; 
    }
}