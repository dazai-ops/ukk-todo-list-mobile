import { View, Text } from "react-native"
import styles from "./styles"
import LogoSVG from "@/assets/svg/empty_task.svg"

const EmptyTask = () => {
  return (
    <View style={styles.containerTasksNotFound}>
      <LogoSVG width={300} height={300}/>
      <View style={styles.containerTasksNotFoundText}>
        <Text>Belum ada tugas sama sekali</Text>
        <Text>🤜Ayo mulai melakukan sesuatu!🤛 </Text>
      </View>
    </View>
  )
}

export default EmptyTask