import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { TouchableOpacity } from "react-native"
import { useWindowDimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native"
import { View, Text, Image, TextInput, ScrollView } from "react-native"
import styles from "./styles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AlertProfileSuccess from "../../ui/Alert/AlertProfileSuccess"
import AlertProfileFailed from "../../ui/Alert/AlertProfileFailed"
import AlertConfirmProfile from "../../ui/Alert/AlertConfirmProfile"
import ModalEditPassword from "../../ui/Modal/ModalChangePassword"

export default function ProfilePage() {

  const router = useRouter()
  const isFocused = useIsFocused()
  const {width} = useWindowDimensions()

  // Endpoint API
  const apiUrl = process.env.EXPO_PUBLIC_URL_API

  const [user, setUser] = useState({})
  const [formError, setFormError] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [tasks, setTask] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  
  const [visibleAlertConfirmUpdateProfile, setVisibleAlertConfirmUpdateProfile] = useState(false);
  const [visibleAlertUpdateProfileSuccess, setVisibleAlertUpdateProfileSuccess] = useState(false);
  const [visibleAlertUpdateProfileFailed, setVisibleAlertUpdateProfileFailed] = useState(false);
  const [visibleModalEditPassoword, setVisibleModalEditPassword] = useState(false);


  // Get user data form Local Storage
  useEffect(() => {
    const checkLogin = async () => {
      try{
        const userData = await AsyncStorage.getItem("user")
        if(userData){
          setUser(JSON.parse(userData))
        }else{
          setUser({})
        }
      }catch(error){
         ("error getting user: ", error)
      }
    }
    checkLogin()
  },[])

  // Fill user data state from Local Storage
  // Use for this view/page
  useEffect(() => {
    if(user && Object.keys(user).length > 0){
      setForm({
        name: user?.name || "",
        email: user?.email || "",
      })
    }
  }, [user])
  
  // Validate form before submit for server (API)
  const validateForm = () => {
    let newError = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!form.email.trim()){
      newError.email = "Email harus diisi";
    }else if(!emailRegex.test(form.email)){
      newError.email = "Format email tidak valid";
    }

    if(!form.name.trim()){
      newError.name = "Nama harus diisi";
    }else if(/\d/.test(form.name)){
      newError.name = "Nama tidak boleh mengandung angka";
    }

    setFormError(newError);
     ("Error",newError)

    return Object.keys(newError).length === 0;
  }

  // Handle Alert confirm update profile
  const handleConfirmUpdateProfile = () => {
    if(!validateForm()) return
    setVisibleAlertConfirmUpdateProfile(true)
  }

  // Handle get tasks
  // By user id
  const handleGetTask = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userId = JSON.parse(user).id;
      const response = await fetch(`${apiUrl}/api/tasks/user/${userId}`, {
        method: "GET",
      });
  
      if (!response.ok) {
         ("Error", "Gagal mengambil data tasks iii");
        return
      }
  
      const result = await response.json();
  
      if (!result || !result.tasks) {
         ("Error Result", "Terjadi kesalahan saat mengambil data tasks");
        return;
      }
  
      setTask(result.tasks);
    } catch (error) {
       ("Error", "Terjadi kesalahan saat mengambil data tasks");
    }
  }
  
  // Call handle get task if page is focused (Open/reopen)
  useEffect(() => {
    handleGetTask()
  }, [isFocused])

  // Handle update data user (name, email)
  const handleUpdateProfile = async () => {
    if(!validateForm()){
      setVisible
    }
    try {
      const response = await fetch(`${apiUrl}/api/user/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email
        }),
      });
      
      const data = await response.json()
      if(data.success) {
         ("berhasil")
        setVisibleAlertUpdateProfileSuccess(true)

        if(data.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
      } else if(data.errors) {
        setErrorMessage("Email sudah terdaftar");
        setVisibleAlertUpdateProfileFailed(true)
        setForm(user)
      }

       ("Result: ", data)
    } catch (error) {
       ("Error", "Terjadi kesalahan saat mengubah data profile");
    }
  };

  const parseDeadline = (dateStr, timeStr) => {
    // Jika format tanggal is "yyyy/mm/dd"
    return new Date(dateStr.replace(/\//g, "-") + "T" + timeStr);
  };

  // Count each task status
  const getTaskCounts = (tasks) => {
    const now = new Date();
  
    return tasks.reduce(
      (acc, task) => {
        // Total tugas
        acc.total += 1;
  
        if (task.status === "open" || task.status === "in_progress") {
          acc.incomplete += 1;
        }
  
        if (task.status === "done") {
          acc.completed += 1;
        }
  
        const deadline = parseDeadline(task.deadline_date, task.deadline_time);

        if (deadline < now) {
          acc.overdue += 1;
        }
  
        return acc;
      },
      { total: 0, incomplete: 0, completed: 0, overdue: 0 }
    );
  };
  
  const counts = getTaskCounts(tasks);

  // Handle Logout
  const handleLogout = async () =>{
    try{
      await AsyncStorage.clear()
      router.replace('/login')
    }catch(error){
       ("Logout failed: ", error)
    }
  }

  return(
    <>
      <View style={styles.mainContainer}>
        {/* Bagian profile atas */}
        <View style={styles.profileContainer}>
          {/* Bagian foto profile */}
          <View>
            <Image source={require("../../../../assets/images/profile.png")} style={{ width: width < 550 ? 70 : 90, height: width < 550 ? 70 : 90 }} />
          </View>
          {/* Bagian data profile */}
          <View style={styles.profileDataContainer}>
            <Text style={[styles.profileName, {fontSize: width < 550 ? 15 : 20}]}>
              {user?.name}
            </Text>
            <Text style={[styles.profileEmail, {fontSize: width < 550 ? 12 : 18}]}>
              {user?.email}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={[styles.logoutButtonText, {fontSize: width < 500 ? 13 : 15 }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider}/>

        {/* Bagian  */}
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }} style={{width: "100%"}} showsVerticalScrollIndicator={false}>
          <View style={styles.totalTasksContainer}>
            <View style={styles.totalTasksContainerLeft}>
              {/* Total tasks */}
              <View style={[styles.totalTask, {backgroundColor: "#A294F9"}]}>
                <Text style={[styles.taskHeader, {fontSize: width < 550 ? 15 : 20}]}>Total Tugas</Text>
                {/* <View style={styles.divider}/> */}
                <Text style={styles.taskCount}>
                  {counts.total}
                </Text>
              </View>
              {/* Total task selesai */}
              <View style={[styles.totalTask, {backgroundColor: "#77B254"}]}>
                <Text style={[styles.taskHeader, {fontSize: width < 550 ? 15 : 20}]}>Selesai</Text>
                <Text style={styles.taskCount}>
                  {counts.completed}
                </Text>
              </View>
            </View>
            <View style={styles.totalTasksContainerRight}>
              {/* Total task belum selesai */}
              <View style={[styles.totalTask, {backgroundColor: "#FFB200"}]}>
                <Text style={[styles.taskHeader, {fontSize: width < 550 ? 15 : 20}]}>Belum Selesai</Text>
                <Text style={styles.taskCount}>
                  {counts.incomplete}
                </Text>
              </View>
              {/* Total task terlambat */}
              <View style={[styles.totalTask, {backgroundColor: "#F93827"}]}>
                <Text style={[styles.taskHeader, {fontSize: width < 550 ? 15 : 20}]}>Terlambat</Text>
                <Text style={styles.taskCount}>
                  {counts.overdue}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.editProfileContainer}>
            <View style={styles.editProfileHeader}>
              <Text style={styles.editProfileText}>
                Edit Profil
              </Text>
            </View>
            <View style={styles.editProfileFormContainer}>
              <View style={styles.inputMainContainer}>
                <View style={styles.labelInputContainer}>
                  <Text style={styles.labelInput}>Nama</Text>
                  {formError.name && <Text style={styles.error}>{formError.name}</Text>}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.input} value={form.name} onChangeText={(text) => setForm({ ...form, name: text })} />
                </View>
              </View>
              
              {/* Inputan email */}
              <View style={styles.inputMainContainer}>
                <View style={styles.labelInputContainer}>
                  <Text style={styles.labelInput}>Email</Text>
                  {formError.email && <Text style={styles.error}>{formError.email}</Text>}
                </View>
                <View style={styles.inputContainer}>
                  <TextInput style={styles.input} value={form.email} keyboardType="email-address" onChangeText={(text) => setForm({ ...form, email: text })} />
                </View>
              </View>
              
              <TouchableOpacity style={styles.editProfileFormButton} onPress={handleConfirmUpdateProfile}>
                <Text style={styles.editProfileFormButtonText}>Simpan Perubahan</Text>
              </TouchableOpacity>
              
              <View style={styles.divider}/>

              <TouchableOpacity style={[styles.editProfileFormButton, {backgroundColor: "#3b5ced"}]} onPress={() => setVisibleModalEditPassword(true)}>
                <Text style={styles.editProfileFormButtonText}>Edit Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <AlertConfirmProfile
        visible={visibleAlertConfirmUpdateProfile}
        setVisible={setVisibleAlertConfirmUpdateProfile}
        onConfirm={handleUpdateProfile}
        message={`Pilih "Simpan" untuk melanjutkan.`}

      />
      <AlertProfileSuccess
        visible={visibleAlertUpdateProfileSuccess}
        setVisible={() => {
          setVisibleAlertUpdateProfileSuccess(false)
          setVisibleAlertConfirmUpdateProfile(false)
        }}
        message={"Profil berhasil diubah"}
        titleName={"Berhasil"}
      />
      <AlertProfileFailed
        visible={visibleAlertUpdateProfileFailed}
        setVisible={() => {
          setVisibleAlertUpdateProfileFailed(false)
          setVisibleAlertConfirmUpdateProfile(false)
        }}
        message={errorMessage}
        titleName={"Gagal"}
      />

      <ModalEditPassword
        visible={visibleModalEditPassoword}
        setVisible={setVisibleModalEditPassword}
      />
    </>
  )
}