import { useEffect } from "react";
import { View, Text} from "react-native";
import { useRouter } from "expo-router";
import style from "./styles"

export default function IntroView(){

  const router = useRouter();
  
  useEffect(() =>{
    const timer = setTimeout(async() => {
      router.replace("/login")
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return(
    <View style={style.bodyContainer}>
      <Text style={style.text}>To do</Text>
      <Text style={style.text}>List</Text>
    </View>
  )
}