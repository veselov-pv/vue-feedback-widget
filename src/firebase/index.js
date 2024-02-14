import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHdP-s3brMVDSbhzczqET-KlHUi1s5eBE",
  authDomain: "vue-feedback-widget.firebaseapp.com",
  projectId: "vue-feedback-widget",
  storageBucket: "vue-feedback-widget.appspot.com",
  messagingSenderId: "428413801137",
  appId: "1:428413801137:web:3f0d092f6b3e6dcfe80890",
  measurementId: "G-CVJSS754LQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
