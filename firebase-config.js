// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBp3QqVYcXH7LqjQqXH7LqjQqXH7LqjQqXH7LqjQ",
    authDomain: "tuan-blackhitt-2027.firebaseapp.com",
    projectId: "tuan-blackhitt-2027",
    storageBucket: "tuan-blackhitt-2027.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
