import { View, Text, Modal, TouchableOpacity } from "react-native";
import styles from "./styles"
import { useWindowDimensions } from "react-native";

const AlertConfirmCrudTask = ({visible, setVisible, onConfirm, message, type }) => {
  
  const {width} = useWindowDimensions();

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
            <Text style={styles.modalCardTitle}>Anda yakin?</Text>
          </View>
          <View style={styles.modalCardContent}>
            <Text style={styles.modalCardContentLabel}>{message}</Text>
          </View>
          <View style={styles.modalCardButton}>
            <TouchableOpacity style={styles.modalCardButtonCancel} onPress={() => setVisible(false)}>
              <Text style={styles.modalCardButtonText}>Batal</Text>
            </TouchableOpacity>
            {type && type === "delete" ? (
              <TouchableOpacity style={styles.modalCardButtonConfirm} onPress={onConfirm}>
                <Text style={[styles.modalCardButtonText, {color: "#fff"}]}>Hapus</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.modalCardButtonConfirm} onPress={onConfirm}>
                <Text style={[styles.modalCardButtonText, {color: "#fff"}]}>Simpan</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AlertConfirmCrudTask