import React from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar, useWindowDimensions } from "react-native";
import { userRegister } from "@/app/hooks/Register";
import AlertAuthFailed from "../../../ui/Alert/AlertAuthFailed";
import AlertAuthSuccess from "../../../ui/Alert/AlertAuthSuccess";

export default function RegisterView() {

  const { width } = useWindowDimensions();
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { formError, handleRegister, visibleAlertFailedRegister, 
    setVisibleAlertFailedRegister, errorMessage, visibleAlertSuccessRegister, 
    setVisibleAlertSuccessRegister, successMessage, isPasswordVisible, 
    setPasswordVisible, isConfirmPasswordVisible, setConfirmPasswordVisible  
  } = userRegister(form);

  return (
    <>
      <View style={styles.mainContainer}>
        <StatusBar hidden={true}/>
        <View style={ width < 550 ? styles.cardContainer: styles.cardContainerTablet }>
          <View style={styles.cardContainerHeader}>
            <View style={styles.headerContainer}>
              <Text style={styles.cardTitle}>
                Registrasi
              </Text>
            </View>
          </View>
          
          <View style={styles.cardContainerForm}>

            {/* Inputan Nama */}
            <View style={styles.labelInputContainer}>
              <Text style={styles.labelInput}>Nama</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input}onChangeText={(text) => setForm({ ...form, name: text })} />
            </View>
            {formError.name && <Text style={styles.error}>{formError.name}</Text>}
            
            {/* Inputan Email */}
            <View style={styles.labelInputContainer}>
              <Text style={styles.labelInput}>Email</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.input} keyboardType="email-address" onChangeText={(text) => setForm({ ...form, email: text })} />
            </View>
            {formError.email && <Text style={styles.error}>{formError.email}</Text>}

            {/* Inputan password */}
            <Text style={styles.labelInput}>Password</Text>
            <View style={[styles.inputContainerPassword, formError.password && styles.inputPasswordContainerError]}>
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

            {/* Inputan konfirmasi password */}
            <Text style={styles.labelInput}>Konfirmasi Password</Text>
            <View style={[styles.inputContainerPassword, formError.password && styles.inputPasswordContainerError]}>
              <TextInput
                style={styles.inputPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.icon} >
                <Ionicons name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={24} color="gray"/>
              </TouchableOpacity>
            </View>
            {formError.confirmPassword && <Text style={styles.error}>{formError.confirmPassword}</Text>}

            <TouchableOpacity style={styles.buttonSubmit} onPress={handleRegister}>
              <Text style={styles.buttonSubmitText}>Submit</Text>
            </TouchableOpacity>

            <Text style={styles.textBottom}>
              Sudah punya akun? <Link href="/login" style={styles.linkBottom}>Login</Link>
            </Text>
            
          </View>
        </View>
      </View>
      <AlertAuthFailed
        visible={visibleAlertFailedRegister}
        setVisible={setVisibleAlertFailedRegister}
        message={errorMessage}
        titleName="Register Gagal"
      />
      <AlertAuthSuccess
        visible={visibleAlertSuccessRegister}
        setVisible={setVisibleAlertSuccessRegister}
        message={successMessage}
        titleName="Registrasi Berhasil"
      />
    </>
  );
}

