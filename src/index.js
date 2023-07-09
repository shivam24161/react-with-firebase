import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
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
initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
