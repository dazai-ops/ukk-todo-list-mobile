import { useState } from "react";
import { Link} from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { userLogin } from "@/app/hooks/Login"
import { View, Text, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";
import styles from "./styles";
import AlertAuthFailed from "../../../ui/Alert/AlertAuthFailed"
import AlertAuthSuccess from "../../../ui/Alert/AlertAuthSuccess"

export default function LoginView() {
  
  const { width } = useWindowDimensions();

  const [form, setForm] = useState({
    email:"", 
    password:""
  })
  
  const {formError, handleLogin, errorMessage, 
    visibleAlertFailedLogin, setVisibleAlertFailedLogin, successMessage, 
    visibleAlertSuccessLogin, setVisibleAlertSuccessLogin, isPasswordVisible, 
    setPasswordVisible
  } = userLogin(form);
  
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={width < 550 ? styles.cardContainer : styles.cardContainerTablet}>
          <View style={styles.cardContainerHeader}>
            <View style={styles.headerContainer}>
              <Text style={styles.cardTitle}>
                Login
              </Text>
            </View>
          </View>
          <View style={styles.cardContainerForm}>

            {/* Inputan email */}
            <Text style={styles.labelInput}>Email</Text>
            <View style={styles.inputEmailContainer}>
              <TextInput style={styles.inputEmail} keyboardType="email-address" onChangeText={(text) => setForm({ ...form, email: text })} />
            </View>
            {formError.email && <Text style={styles.error}>{formError.email}</Text>}
            
            
            {/* Inputan password */}
            <Text style={styles.labelInput}>Password</Text>
            <View style={styles.inputPasswordContainer}>
              <TextInput
                style={styles.inputPassword}
                secureTextEntry={!isPasswordVisible}
                onChangeText={(text) => setForm({ ...form, password: text })}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)} style={styles.icon} >
                <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray"/>
              </TouchableOpacity>
            </View>
            {formError.password && <Text style={styles.error}>{formError.password}</Text>}
            
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleLogin}>
              <Text style={styles.buttonSubmitText}>Submit</Text>
            </TouchableOpacity>
            
            <Text style={styles.textBottom}>Belum punya akun? <Link href="/register" style={styles.linkBottom}>Register</Link></Text>
            
          </View>
        </View>
      </View>
      <AlertAuthFailed
        visible={visibleAlertFailedLogin}
        setVisible={setVisibleAlertFailedLogin}
        message={errorMessage}
        titleName="Login Gagal"
      />
      <AlertAuthSuccess
        visible={visibleAlertSuccessLogin}
        setVisible={setVisibleAlertSuccessLogin}
        message={successMessage}
        titleName="Login Berhasil"
      />
    </>
  );
}


