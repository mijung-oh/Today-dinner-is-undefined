import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK1CCL3zLq67X2BxMRVz1f0OVrazwI71M",
  authDomain: "curation-ba2c2.firebaseapp.com",
  projectId: "curation-ba2c2",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const db = firebase.firestore();
