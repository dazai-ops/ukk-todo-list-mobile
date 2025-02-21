import { useWindowDimensions } from "react-native";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";

const ModalChangeTabType = ({visible, setVisible, handleTypeTabChange, selectedTab}) => {

  const { width } = useWindowDimensions();
  
  const TAB_TYPE = ["By Status", "By Prioritas", "Terjadwal"];

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalCard, {width: width < 550 ? "90%" : "70%"}]}>
            <View style={styles.modalCardHeader}>
              <Text style={styles.modalCardTitle}>Pilih Tampilan Tab</Text>
            </View>
            <View style={styles.modalCardContent}>
              <View style={styles.filterStatusContainer}>
                {TAB_TYPE.map(tab => (
                  <TouchableOpacity
                    key={tab}
                    style={[styles.filterStatusButton, selectedTab === tab && styles.filterStatusButtonActive]}
                    onPress={() => handleTypeTabChange(tab)}
                  >
                    <Text style={[styles.filterStatusButtonText, { color: selectedTab === tab ? "#fff" : "#000", fontSize: width < 550 ? 13 : 15}]}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Tombol untuk menutup modal */}
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                <Text style={[styles.closeButtonText, { fontSize: width < 550 ? 13 : 15}]}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
    </>
  )
}

export default ModalChangeTabType