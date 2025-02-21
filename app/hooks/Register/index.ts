import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

type FormType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorObject {
  name?: string; 
  email?: string; 
  password?: string; 
  confirmPassword?: string;
}

export const userRegister = (form: FormType) => {

  const apiUrl = process.env.EXPO_PUBLIC_URL_API
  const router = useRouter();
  
  
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formError, setFormError] = useState<ErrorObject>({});
  const [visibleAlertFailedRegister, setVisibleAlertFailedRegister] = useState(false);
  const [visibleAlertSuccessRegister, setVisibleAlertSuccessRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if(form.name && form.email && form.password && form.confirmPassword) {
      setIsFormFilled(true);
    }else{
      setIsFormFilled(false);
    }
  }, [form]);

  const validateForm = () => {
    let newError: ErrorObject = {};

    if(!form.name.trim()){
      newError.name = "Nama harus diisi";
    }else if(/\d/.test(form.name)){
      newError.name = "Nama tidak boleh mengandung angka";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!form.email.trim()){
      newError.email = "Email harus diisi";
    }else if(!emailRegex.test(form.email)){
      newError.email = "Format email tidak valid";
    }

    // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!form.password.trim()){
      newError.password = "Password harus diisi";
    }else if(!passwordRegex.test(form.password)){
      newError.password = "Password minimal 8 karakter, mengandung huruf besar, kecil, dan angka";
    }

    if(!form.confirmPassword.trim()){
      newError.confirmPassword = "Konfirmasi Password harus diisi";
    } else if (form.password !== form.confirmPassword) {
      newError.confirmPassword = "Password dan konfirmasi password harus sama";
    }

    setFormError(newError);
    setIsFormFilled(false)

    return Object.keys(newError).length === 0;
  }

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/register`, {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: form.name, 
          email: form.email,
          password: form.password 
        }),
      });

      const { success, errors } = await response.json();

      if (success) {
        setSuccessMessage("Silahkan untuk login");
        setVisibleAlertSuccessRegister(true);
        setTimeout(() => {
          router.replace("/login");
        }, 2000)
      } else if (errors) {
        const errorMessage = Object.values(errors).flat().join("\n");
        setErrorMessage(errorMessage);
        setVisibleAlertFailedRegister(true);
      } else {
        throw new Error("Response tidak dikenali");
      }
    } catch (error) {
      setVisibleAlertFailedRegister(true);
      setErrorMessage("Terjadi kesalahan pada server");
    }
  };

  return {isFormFilled, formError, validateForm, handleRegister, visibleAlertFailedRegister, setVisibleAlertFailedRegister, errorMessage, visibleAlertSuccessRegister, setVisibleAlertSuccessRegister, successMessage, isPasswordVisible, setPasswordVisible, isConfirmPasswordVisible, setConfirmPasswordVisible};
}