import { useWindowDimensions } from "react-native";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { formatPriority, formatStatus, formatDate, formatTime } from "@/app/utils/formatted";
import styles from "./styles";

const ModalDetailTask = ({visible, detailTask, setVisible, handleDeleteTask}) => {
  
  const { width } = useWindowDimensions();
  
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalCard, {width: width < 550 ? "95%" : "80%"}]}>
          <View style={styles.modalCardHeader}>
            <Text style={styles.modalCardTitle}>Detail Task</Text>
          </View>
          <View style={styles.modalCardContent}>
            {detailTask && (
              <View>
                {/* Show task title */}
                <View style={{marginTop: 15}}>
                  <Text style={styles.modalCardContentLabel}>Judul task</Text>
                  <View style={styles.modalCardContentTitle}>
                    <Text>{detailTask.judul}</Text>
                  </View>
                </View>

                {/* Show task detail */}
                <View style={{marginTop: 10}}>
                  <Text style={styles.modalCardContentLabel}>Detail task</Text>
                  <View style={styles.modalCardContentDetail}>
                    <Text>{detailTask.detail}</Text>
                  </View>
                </View>

                {/* Show task deadline (time & date) */}
                <View style={{marginTop: 10}}>
                  <Text style={styles.modalCardContentLabel}>Tenggat waktu</Text>
                  <View style={styles.modalCardContentDeadline}>
                    <View style={styles.modalCardContentDeadlineDate}>
                      <Text style={{alignSelf: "center"}}>
                        {formatDate(detailTask.deadline_date)}
                      </Text>
                    </View>
                    <View style={styles.modalCardContentDeadlineTime}>
                      <Text style={{alignSelf: "center"}}>
                        { detailTask.deadline_time ? formatTime(detailTask.deadline_time) : "Loading"}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Show task priority and status */}
                <View style={{marginTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
                  <View style={{width: "49%"}}>
                    <Text style={styles.modalCardContentLabel}>Prioritas</Text>
                    <View style={[styles.modalCardContentPriority, {backgroundColor: detailTask.prioritas === "low" ? "#578FCA" : detailTask.prioritas === "medium" ? "#FBA518" : "#E52020"}]}>
                      <Text style={{color: "#fff", alignSelf:"center", fontWeight: "bold"}}>{formatPriority(detailTask.prioritas)}</Text>
                    </View>
                  </View>
                  <View style={{width: "49%"}}>
                    <Text style={styles.modalCardContentLabel}>Status</Text>
                    <View style={[styles.modalCardContentStatus, {backgroundColor: detailTask.status === "open" ? "#FF7F3E" : detailTask.status === "in_progress" ? "#493D9E" : "#5CB338"}]}>
                      <Text style={{color: "#fff", alignSelf:"center", fontWeight: "bold"}}>{ formatStatus(detailTask.status)}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            <View style={styles.dividerBottom}/>

            <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteTask(detailTask.id)} style={styles.deleteButton}>
              <Text style={styles.closeButtonText}>Hapus Tugas</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalDetailTask