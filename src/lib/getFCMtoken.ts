import { getToken } from "firebase/messaging";
import { getFirebaseMessaging } from "./firebase";

export const getFCMtoken = async () => {
  if (typeof window === "undefined") return null;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.log("Notification permission denied");
    return null;
  }

  const messaging = getFirebaseMessaging();
  if (!messaging) {
    console.log("Firebase messaging is unavailable in this environment.");
    return null;
  }

  const token =await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
  });

  return token;
};