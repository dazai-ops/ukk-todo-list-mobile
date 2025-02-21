import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

type FormType = {
  title: string;
  detail: string;
  priority: string;
  deadline_date: string;
  deadline_time: string;
}

interface ErrorObject {
  title?: string; 
  detail?: string; 
  priority?: string; 
  deadline_date?: string;
  deadline_time?: string;
}

export const taskCreate = (form: FormType, onSuccess: (message: string) => void) => {
  const apiUrl = process.env.EXPO_PUBLIC_URL_API
  const [showSelectPriority, setShowSelectPriority] = useState(false);
  const [valueSelectPriority, setValueSelectPriority] = useState(null);
  const [itemsSelectPriority, setItemsSelectPriority] = useState([
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ]);

  const [visibleAlertCreateTaskSuccess, setVisibleAlertCreateTaskSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState(undefined);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formError, setFormError] = useState<ErrorObject>({});

  const validateForm = () => {
    let newError: ErrorObject = {};

    if(!form.title.trim()){
      newError.title = "Judul harus diisi";
    }

    if(!form.detail.trim()){
      newError.detail = "Detail harus diisi";
    }
    if(!form.priority.trim()){
      newError.priority = "Prioritas harus diisi";
    }

    if(!form.deadline_date){
      newError.deadline_date = "Hari harus diisi";
    }
    if(!form.deadline_time){
      newError.deadline_time = "Waktu harus diisi";
    }

    setFormError(newError);
    setIsFormFilled(false);

     ("Error",newError)
    return Object.keys(newError).length === 0;
  }

  const handleNewTask = async () => {
    if(!validateForm()) {
      return
    };
    
    const deadlineDate = new Date(form.deadline_date).toISOString().split("T")[0];
    const deadlineTime = new Date(form.deadline_time).toTimeString().split(" ")[0];
    
    try {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      const userId = JSON.parse(user).id;

      const response = await fetch(`${apiUrl}/api/tasks`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization" : `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          judul: form.title,
          detail: form.detail,
          prioritas: form.priority,
          deadline_date: deadlineDate,
          deadline_time: deadlineTime,
          status: "open",
        }),
      })

      const responseClone = response.clone();
      const errorText = await responseClone.text();
      const { success, errors } = await response.json();

      if (success) {
        onSuccess(true)
        setDate(undefined);
        setTime(undefined);
        setValueSelectPriority(null);
        setVisibleAlertCreateTaskSuccess(true);
        setSuccessMessage(`Lihat pada menu "Daftar Tugas"`)
      } else if (errors) {
        const errorMessage = Object.values(errors).flat().join("\n");
        Alert.alert("Opss..", errorMessage);
      } else {
        throw new Error("Response tidak dikenali");
      }
    }catch(error){
      Alert.alert("Opss..", "Terjadi kesalahan saat menghubungi server.");
       (error)
    }
  }
  
  useEffect(() => {
    setFormError({})
    if(form.title && form.detail && form.priority && form.deadline_date && form.deadline_time) {
      setIsFormFilled(true);
    }else{
      setIsFormFilled(false);
    }
  }, [form]);

  return { form, handleNewTask, showSelectPriority, setShowSelectPriority, valueSelectPriority, setValueSelectPriority, itemsSelectPriority, setItemsSelectPriority, date, setDate, showDate, setShowDate, time, setTime, showTime, setShowTime, isFormFilled, formError, visibleAlertCreateTaskSuccess, setVisibleAlertCreateTaskSuccess, successMessage}
}