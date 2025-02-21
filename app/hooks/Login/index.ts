import { useEffect, useState } from "react";
import { Platform, Alert, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ErrorObject {email?: string; password?: string;}
type FormType = {email: string, password: string}

export const userLogin = (form: FormType) => {
  const router = useRouter();
  const apiUrl = process.env.EXPO_PUBLIC_URL_API

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formError, setFormError] = useState<ErrorObject>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [visibleAlertFailedLogin, setVisibleAlertFailedLogin] = useState(false);
  const [visibleAlertSuccessLogin, setVisibleAlertSuccessLogin] = useState(false);

  const validateForm = () => {
    let newError: ErrorObject = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!form.email.trim()){
      newError.email = "Email harus diisi";
    }else if(!emailRegex.test(form.email)){
      newError.email = "Format email tidak valid";
    }

    if(!form.password.trim()){
      newError.password = "Password harus diisi";
    }

    setFormError(newError);

    return Object.keys(newError).length === 0;
  }

  const handleLogin = async () => {

    if (!validateForm()) return;
  
    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      const data = await response.json();
       (data)

      if (response.ok) {

        if(Platform.OS === "web") {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Set user login data on Local storage
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);
  
        setVisibleAlertSuccessLogin(true);
        setSuccessMessage("Dialihkan ke halaman dashboard");

        setTimeout(() => {
          router.replace("/dashboard");
        }, 2000)
      } else {
        setVisibleAlertFailedLogin(true);
        setErrorMessage(data.message);
      }
    } catch (error) {
      setVisibleAlertFailedLogin(true);
      setErrorMessage("Terjadi kesalahan pada server");
    }
  };

  return { formError, validateForm, handleLogin, errorMessage, visibleAlertFailedLogin, setVisibleAlertFailedLogin, successMessage, visibleAlertSuccessLogin, setVisibleAlertSuccessLogin, isPasswordVisible, setPasswordVisible};
}