import styles from "./styles"
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native"
import { useState, useEffect } from "react"
import { useWindowDimensions } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AlertProfileFailed from "../../Alert/AlertProfileFailed";
import AlertProfileSuccess from "../../Alert/AlertProfileSuccess";
import AlertConfirmProfile from "../../Alert/AlertConfirmProfile";

const ModalChangePassword = ({visible, setVisible}) => {
  
  const { width } = useWindowDimensions();
  const apiUrl = process.env.EXPO_PUBLIC_URL_API

  const [user, setUser] = useState({});
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [visibleAlertConfirmUpdatePassword, setVisibleAlertConfirmUpdatePassword] = useState(false);
  const [visibleAlertUpdatePasswordSuccess, setVisibleAlertUpdatePasswordSuccess] = useState(false);
  const [visibleAlertUpdatePasswordFailed, setVisibleAlertUpdatePasswordFailed] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState({});
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleConfirmUpdatePassword = () => {
    if(!isFormFilled) return
    setVisibleAlertConfirmUpdatePassword(true)
  }

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

  useEffect(() => {
     (form)
  }, [form])

  useEffect(() => {
    if(form.currentPassword && form.newPassword && form.confirmPassword) {
      setIsFormFilled(true);
    }else{
      setIsFormFilled(false);
    }
  }, [form]);

  const validateForm = () => {
    let newError = {};

    if(!form.currentPassword.trim()){
      newError.currentPassword = "Password harus diisi";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(!form.newPassword.trim()){
      newError.newPassword = "Password baru harus diisi";
    }else if(!passwordRegex.test(form.newPassword)){
      newError.newPassword = "Password minimal 8 karakter, mengandung huruf besar, kecil, dan angka";
    }

    if(!form.confirmPassword.trim()){
      newError.confirmPassword = "Konfirmasi Password harus diisi";
    } else if (form.newPassword !== form.confirmPassword) {
      newError.confirmPassword = "Password dan konfirmasi password harus sama";
    }

    setFormError(newError);
    setIsFormFilled(false)

    return Object.keys(newError).length === 0;
  }

  const handleUpdatePassword = async () => {
    if(!validateForm()) return

    try {
      const response = await fetch(`${apiUrl}/api/user/password/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: form.currentPassword,
          new_password: form.newPassword
        }),
      });
      
      const data = await response.json()
       (data)
      if(data.success) {
        setVisibleAlertUpdatePasswordSuccess(true)
      } else if(data.message) {
        setVisibleAlertUpdatePasswordFailed(true)
        setErrorMessage(data.message)
      }
    } catch (error) {
       (error)
    }
  }
  
  return (  
    <>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalCard, {width: width < 550 ? "90%" : "80%"}]}>
            <View style={styles.modalCardHeader}>
              <Text style={[styles.modalCardTitle, {fontSize: width < 550 ? 20 : 25}]}>Edit Password</Text>
            </View> 
            {/* <Text>Hello</Text> */}
            <View style={styles.modalCardContent}>

              <Text style={styles.labelInput}>Password lama</Text>
              <View style={[styles.inputContainerPassword, formError.password && styles.inputPasswordContainerError]}>
                <TextInput
                  style={styles.inputPassword}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={(text) => setForm({ ...form, currentPassword: text })}
                />
                <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.icon} >
                  <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray"/>
                </TouchableOpacity>
              </View>
              {formError.currentPassword && <Text style={styles.error}>{formError.currentPassword}</Text>}

              <Text style={styles.labelInput}>Password baru</Text>
              <View style={[styles.inputContainerPassword, formError.password && styles.inputPasswordContainerError]}>
                <TextInput
                  style={styles.inputPassword}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={(text) => setForm({ ...form, newPassword: text })}
                />
              </View>
              {formError.newPassword && <Text style={styles.error}>{formError.newPassword}</Text>}

              <Text style={styles.labelInput}>Konfirmasi Password</Text>
              <View style={[styles.inputContainerPassword, formError.password && styles.inputPasswordContainerError]}>
                <TextInput
                  style={styles.inputPassword}
                  secureTextEntry={!isPasswordVisible}
                  onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
                />
              </View>
              {formError.confirmPassword && <Text style={styles.error}>{formError.confirmPassword}</Text>}

              <View>
                <TouchableOpacity style={[styles.buttonSubmit]}  onPress={handleUpdatePassword}>
                  <Text style={styles.buttonSubmitText}>Simpan Perubahan</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setVisible(false), setFormError({}), setForm({currentPassword: "", newPassword: "", confirmPassword: ""})}} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Batal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <AlertConfirmProfile
        visible={visibleAlertConfirmUpdatePassword}
        setVisible={setVisibleAlertConfirmUpdatePassword}
        onConfirm={handleUpdatePassword}
        message={`Pilih "" untuk menyimpan perubahan.`}
      />
      <AlertProfileSuccess
        visible={visibleAlertUpdatePasswordSuccess}
        setVisible={() => {
          setVisibleAlertConfirmUpdatePassword(false)
          setVisibleAlertUpdatePasswordSuccess(false)
          setVisible(false)
        }}
        message={"Password berhasil diubah"}
        titleName={"Berhasil"}
      />
      <AlertProfileFailed
        visible={visibleAlertUpdatePasswordFailed}
        setVisible={() => {
          setVisibleAlertConfirmUpdatePassword(false)
          setVisibleAlertUpdatePasswordFailed(false)
        }}
        message={errorMessage}
        titleName={"Gagal"}
      />
    </>  
  )
}

export default ModalChangePassword