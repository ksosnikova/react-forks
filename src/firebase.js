import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBog2cAkCwb6NVWKIet605ws6T2UN7ZnyU",
  authDomain: "gh-forks-35ec8.firebaseapp.com",
  databaseURL: "https://gh-forks-35ec8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gh-forks-35ec8",
  storageBucket: "gh-forks-35ec8.appspot.com",
  messagingSenderId: "960313959646",
  appId: "1:960313959646:web:94bfbc726eb45df4200e4f"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database().ref('Forks');