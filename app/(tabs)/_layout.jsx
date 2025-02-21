import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function RootLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        tabBarInactiveTintColor: '#bbb',
        tabBarHideOnKeyboard: true, // Menyembunyikan tab bar saat keyboard muncul
        headerStyle: {
          backgroundColor: '#000',
        },
        headerShadowVisible: false,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#25292e',
        },
      }}
    >
      <Tabs.Screen 
        name="dashboard" 
        options={{ 
          title: "Daftar Tugas", 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="tasks" color={color} size={22} />
          ),
        }}
      />
      <Tabs.Screen 
        name="create" 
        options={{ 
          title: "Buat Tugas", 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="add-task" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: "Profil", 
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
