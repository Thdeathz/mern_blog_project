// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAgvZLQQJRpj_JpNn2qMuzYazK4z7qwS5E',
  authDomain: 'mernblogapp-555d2.firebaseapp.com',
  projectId: 'mernblogapp-555d2',
  storageBucket: 'mernblogapp-555d2.appspot.com',
  messagingSenderId: '224600838271',
  appId: '1:224600838271:web:2cf01764baf9750f202f4a',
  measurementId: 'G-QQJ0BXNEEX'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
