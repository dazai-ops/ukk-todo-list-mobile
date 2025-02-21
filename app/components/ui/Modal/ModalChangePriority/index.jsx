import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { formatPriority, formatPriorityToLowercase} from "@/app/utils/formatted";
import styles from "./styles";
import AlertConfirmCrudTask from "../../Alert/AlertConfirmCRUDTask";
import AlertCrudTaskSuccess from "../../Alert/AlertCRUDTaskSuccess";
import AlertCrudTaskFailed from "../../Alert/AlertCRUDTaskFailed";

const ModalChangePriority = ({visible, setVisibleModalPriority, selectedTask, onPriorityChanged}) => {

  // Endpoint API
  const apiUrl = process.env.EXPO_PUBLIC_URL_API
  const { width } = useWindowDimensions();

  const PRIORITY = ["Low", "Medium", "High"];

  // Initial Priority value
  const selectPriority = formatPriority(selectedTask.priority)

  const [selectedPriority, setSelectedPriority] = useState(selectPriority);
  const [priorityToChange, setPriorityToChange] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // State handle Visible modal & alert
  const [visibleConfirmPriority, setVisibleModalConfirmPriority] = useState(false);
  const [visibleAlertPrioritySuccess, setVisibleAlertPrioritySuccess] = useState(false);
  const [visibleAlertPriorityFailed, setVisibleAlertPriorityFailed] = useState(false);

  // Set initial selected priority
  useEffect(() => {
    if(selectPriority != undefined){
      setSelectedPriority(selectPriority);
    }
  }, [selectedTask]); 

  // Handle new selected priority
  const handlePriorityChange = (priority) => {
    setPriorityToChange(priority)
    setVisibleModalConfirmPriority(true)
  } 

  // Handle confirm change priority
  const handleConfirmPriorityChange = async () => {
    if (!priorityToChange) return

    const selectPriority = formatPriorityToLowercase(priorityToChange);
    setSelectedPriority(priorityToChange);
    setVisibleModalConfirmPriority(true);

    try{
      const response = await fetch(`${apiUrl}/api/task/${selectedTask.id}/priority`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: selectPriority }),
      })
      
      if(response.ok) {
        onPriorityChanged()
        setVisibleModalConfirmPriority(false)
        setVisibleModalPriority(false)
        setAlertMessage("Prioritas berhasil diubah")
        setVisibleAlertPrioritySuccess(true);
        setSelectedPriority("")
      }else{
        setAlertMessage("Prioritas gagal diubah")
        setVisibleAlertPriorityFailed(true)
        setVisibleModalConfirmPriority(false)
        setVisibleModalPriority(false)
      }
    }catch(error) {
      setVisibleModalConfirmPriority(false)
      setVisibleModalPriority(false)
      setAlertMessage("Ada gangguan di server")
      setVisibleAlertPriorityFailed(true)
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={() => setVisibleModalPriority(false)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalCard, {width: width < 550 ? "90%" : "65%"}]}>
            <View style={styles.modalCardHeader}>
              <Text style={[styles.modalCardTitle, {fontSize: width < 550 ? 20 : 25}]}>Ubah Prioritas</Text>
            </View>
            <View style={styles.modalCardContent}>
              
              <View style={styles.filterStatusContainer}>
                {PRIORITY.map(priority => (
                  <TouchableOpacity
                    key={priority}
                    style={[styles.filterStatusButton, selectedPriority === priority && styles.filterStatusButtonActive]}
                    onPress={() => handlePriorityChange(priority)}
                  >
                    <Text style={[styles.filterStatusButtonText, { color: selectedPriority === priority ? "#fff" : "#000", fontSize: width < 550 ? 12 : 15}]}>
                      {priority}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Tombol untuk menutup modal */}
              <TouchableOpacity onPress={() => setVisibleModalPriority(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Alert confirm change priority */}
      <AlertConfirmCrudTask
        visible={visibleConfirmPriority}
        setVisible={setVisibleModalConfirmPriority}
        onConfirm={handleConfirmPriorityChange}
        message={`Tekan "Simpan" untuk melanjutkan`}
      />

      {/* Alert success change priority */}
      <AlertCrudTaskSuccess
        visible={visibleAlertPrioritySuccess}
        setVisible={setVisibleAlertPrioritySuccess}
        message={alertMessage}
        titleName={"Berhasil"}
      />

      {/* Alert failed change priority */}
      <AlertCrudTaskFailed
        visible={visibleAlertPriorityFailed}
        setVisible={setVisibleAlertPriorityFailed}
        message={alertMessage}
        titleName={"Gagal"}
      />
      
    </>
  )
}

export default ModalChangePriority