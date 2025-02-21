import { View, Text, Modal, TouchableOpacity } from "react-native";
import styles from "./styles"
import { useWindowDimensions } from "react-native";

const AlertCrudTaskSuccess = ({visible, setVisible, message, titleName}) => {
  
  const { width } = useWindowDimensions();
  
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalCard, {width: width < 550 ? "80%" : "65%"}]}>
          <View style={styles.modalCardHeader}>
            <Text style={styles.modalCardTitle}>{titleName}</Text>
          </View>
          <View style={styles.modalCardContent}>
            <Text style={styles.modalCardContentLabel}>{message}</Text>
          </View>
          <TouchableOpacity style={styles.modalCardButtonCancel} onPress={() => setVisible(false)}>
            <Text style={styles.modalCardButtonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default AlertCrudTaskSuccess