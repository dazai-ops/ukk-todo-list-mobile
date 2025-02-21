import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Stack } from "expo-router";
import { Image } from "react-native";
import styles from "./styles";

const NotFoundView = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found', headerShown: false }} />
      <View style={styles.container}>
        <Image source={require("../../../../assets/images/404.png")} style={{ width: 200, height: 200 }}/>
        <Text>Anda kehilangan tujuan</Text>
        <Link href={"/"} style={styles.move}>Klik disini</Link>
      </View>
    </>
  );
}

export default NotFoundView