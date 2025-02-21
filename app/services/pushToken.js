import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

// Endpoint API to Laravel :)
const apiUrl = process.env.EXPO_PUBLIC_URL_API;

async function registerForPushNotificationsAsync() {
  let token;

  // Check platfrom OS (Android only)
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    });
  } else if (Platform.OS === 'web' || Platform.OS === 'ios') {
    return
  }

  // Check notification permissions dari user
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Jika user belum memberikan izin
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Izin notifikasi diperlukan!');
    return;
  }

  // Permission allowed: get Expo Token
  token = (await Notifications.getExpoPushTokenAsync({
    projectId: "your-project-id",
  })).data;
  return token; 
}

// Save token to server base on user login (user id)
const saveTokenToServer = async (userId, expoPushToken) => {
  try {
    const response = await fetch(`${apiUrl}/api/save-token`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        expo_push_token: expoPushToken,
      }),
    });

    const data = await response.json();
     (data);
  } catch (error) {
    console.error("Error saving token to server:", error);
  }
};

export function usePushNotification() {
  const [expoPushToken, setExpoPushToken] = useState(null);

  useEffect(() => {
    const fetchUserAndRegisterToken = async () => {
      try {
        // Fetch user data from AsyncStorage
        const user = await AsyncStorage.getItem('user');
        if (!user) {
          console.error("Tidak ditemukan data user di LS");
          return;
        }

        // Parse user data and extract userId
        const parsedUser = JSON.parse(user);
        const userId = parsedUser?.id;

        if (!userId) {
          console.error("Tidak ditemukan ID user");
          return;
        }

        // Register for push notifications and get the token
        const token = await registerForPushNotificationsAsync();
        if (token) {
          setExpoPushToken(token);
          await saveTokenToServer(userId, token); // Save token to server (Function above)
        }
      } catch (error) {
        console.error("Error di usePushNotification", error);
      }
    };

    fetchUserAndRegisterToken();
  }, []);

  return expoPushToken;
}