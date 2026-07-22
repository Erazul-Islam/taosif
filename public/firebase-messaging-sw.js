importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCf6obMXSBKpG4piR-0ZqN-XuyWfwIi9MY",
  authDomain: "portfolio-a96be.firebaseapp.com",
  projectId: "portfolio-a96be",
  storageBucket: "portfolio-a96be.firebasestorage.app",
  messagingSenderId: "1050551985651",
  appId: "1:1050551985651:web:6e73c65d681a38e839de86",
  measurementId: "G-9WX58LLM3M"
});

const messaging = firebase.messaging();

if (messaging) {
  onMessage(messaging, (payload) => {
    console.log("Foreground message:", payload);

    new Notification(payload.notification.title, {
      body: payload.notification.body,
    });
  });
}