import { useEffect, useState } from "react";
import { useWindowDimensions } from "react-native";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { formatStatus, formatStatusToSnake } from "@/app/utils/formatted";
import styles from "./styles";
import AlertConfirmCrudTask from "../../Alert/AlertConfirmCRUDTask";
import AlertCrudTaskSuccess from "../../Alert/AlertCRUDTaskSuccess";
import AlertCrudTaskFailed from "../../Alert/AlertCRUDTaskFailed";

const ModalChangeStatus = ({visible, setVisibleModalStatus, selectedTask, onStatusChanged}) => {

  const apiUrl = process.env.EXPO_PUBLIC_URL_API
  const {width} = useWindowDimensions();

  const STATUS = ["Open", "In Progress", "Done"];

  // Initial selected status
  const selectStatus = formatStatus(selectedTask.status)

  const [selectedStatus, setSelectedStatus] = useState(selectStatus);
  const [statusToChange, setStatusToChange] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Set visible for modal & alert
  const [visibleConfirmStatus, setVisibleModalConfirmStatus] = useState(false);
  const [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false);
  const [visibleAlertFailed, setVisibleAlertFailed] = useState(false);

  // Initial selected status from props
  useEffect(() => {
    if(selectStatus != undefined){
      setSelectedStatus(selectStatus);
    }
  }, [selectedTask]); 

  // Handle new selected status
  const handleStatusChange = (status) => {
    setStatusToChange(status)
    setVisibleModalConfirmStatus(true)
  } 

  // Handle confirm change status
  const handleConfirmStatusChange = async () => {
    if (!statusToChange) return

    const selectStatus = formatStatusToSnake(statusToChange);
    setSelectedStatus(statusToChange);
    setVisibleModalConfirmStatus(true);

    try{
      const response = await fetch(`${apiUrl}/api/task/${selectedTask.id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectStatus }),
      })
      
      if(response.ok) {
        onStatusChanged()
        setAlertMessage("Status berhasil diubah")
        setVisibleAlertSuccess(true);
        setVisibleModalConfirmStatus(false)
        setVisibleModalStatus(false)
        setSelectedStatus("")
      }else{
        setVisibleModalConfirmStatus(false)
        setVisibleModalStatus(false)
        setAlertMessage("Status gagal diubah")
        setVisibleAlertFailed(true)
      }
    }catch(error) {
      setVisibleModalConfirmStatus(false)
      setVisibleModalStatus(false)
      setAlertMessage("Ada gangguan di server")
      setVisibleAlertFailed(true);
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={() => setVisibleModalStatus(false)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalCard, {width: width < 550 ? "90%" : "65%"}]}>
            <View style={styles.modalCardHeader}>
              <Text style={[styles.modalCardTitle, {fontSize: width < 550 ? 20 : 25}]}>Ubah Status</Text>
            </View>
            <View style={styles.modalCardContent}>
              <View style={styles.filterStatusContainer}>
                {STATUS.map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[styles.filterStatusButton, selectedStatus === status && styles.filterStatusButtonActive]}
                    onPress={() => handleStatusChange(status)}
                  >
                    <Text style={[styles.filterStatusButtonText, { color: selectedStatus === status ? "#fff" : "#000", fontSize: width < 550 ? 12 : 15}]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {/* Tombol untuk menutup modal */}
              <TouchableOpacity onPress={() => setVisibleModalStatus(false)} style={styles.closeButton}>
                <Text style={[styles.closeButtonText, {fontSize: width < 550 ? 12 : 15}]}>Tutup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Alert to confirm change status */}
      <AlertConfirmCrudTask
        visible={visibleConfirmStatus}
        setVisible={setVisibleModalConfirmStatus}
        onConfirm={handleConfirmStatusChange}
        message={`Tekan "Simpan" untuk melanjutkan`}
      />

      {/* Alert show result success */}
      <AlertCrudTaskSuccess
        visible={visibleAlertSuccess}
        setVisible={setVisibleAlertSuccess}
        titleName={"Berhasil"}
        message={alertMessage}
      />

      {/* Alert show result failed */}
      <AlertCrudTaskFailed
        visible={visibleAlertFailed}
        setVisible={setVisibleAlertFailed}
        titleName={"Gagal"}
        message={alertMessage}
      />
      
    </>
  )
}

export default ModalChangeStatus