import firebase from "firebase";
firebase.initializeApp({
  apiKey: "AIzaSyA11hsUq7C19ei5OAVKHFKATyta5DpEnAQ",
  authDomain: "todo-app-9d7b4.firebaseapp.com",
  databaseURL: "https://todo-app-9d7b4.firebaseio.com",
  projectId: "todo-app-9d7b4",
  storageBucket: "todo-app-9d7b4.appspot.com",
  messagingSenderId: "233698068864",
  appId: "1:233698068864:web:85a859af13ab88de935965",
  measurementId: "G-V9XZ5GVRNB",
});

const db = firebase.firestore();

export { db };
