importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.0/firebase-messaging.js');

const config = {
  apiKey: "AIzaSyCitBPotnC5p17aUIoLT_mx1FgOPNPzqss",
  authDomain: "web-quickstart-e2909.firebaseapp.com",
  databaseURL: "https://web-quickstart-e2909.firebaseio.com",
  projectId: "web-quickstart-e2909",
  storageBucket: "web-quickstart-e2909.appspot.com",
  messagingSenderId: "154151187466",
}

firebase.initializeApp(config)

const messaging = firebase.messaging();