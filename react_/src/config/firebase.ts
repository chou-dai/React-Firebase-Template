import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBwonZLbgLSMzXjF-uGreGX7WT72qF2drU",
    authDomain: "circus-firebase.firebaseapp.com",
    databaseURL: "https://circus-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "circus-firebase",
    storageBucket: "circus-firebase.appspot.com",
    messagingSenderId: "454901924477",
    appId: "1:454901924477:web:7192bae3b4457d37e8a714"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8080);
connectStorageEmulator(storage, "localhost", 9199);

export { auth };
export { db };
export { storage };