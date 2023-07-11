import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAslctXFkxmrmcSxaR5G3YdnyOxgC236UQ",
  authDomain: "wearefriendsfrombiet.firebaseapp.com",
  databaseURL: "https://wearefriendsfrombiet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wearefriendsfrombiet",
  storageBucket: "wearefriendsfrombiet.appspot.com",
  messagingSenderId: "790387619583",
  appId: "1:790387619583:web:d2bf8818c193ff30c8beca"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
