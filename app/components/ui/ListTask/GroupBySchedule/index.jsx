import { Feather } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import { formatPriority, formatStatus, formatTime, formatDate } from "@/app/utils/formatted";
import { getTodayDate, getTomorrowDate } from "../../../../utils/getDateAndTime";
import styles from "./styles";

const ShowGroupTasksByScheduled = ({filteredTasks, showModalDetail, showModalStatus, showModalPriority, showModalEditTask, selectedScheduled}) => {
  
  const {width} = useWindowDimensions();

  const tomorrow = getTomorrowDate() 

  const tasksBySchedule = filteredTasks.filter((task) => {
    if (selectedScheduled === "Hari Ini") {
      const today = getTodayDate()
      return task.deadline_date === today;
    } else if (selectedScheduled === "Besok") {
      return task.deadline_date === tomorrow;
    } else if (selectedScheduled === "Terlambat") {
      const deadlineDateTiem = new Date (`${task.deadline_date}T${task.deadline_time}`);
      return deadlineDateTiem < new Date() && task.status != "done";
    }
  })

   (tasksBySchedule)

  return (
    <FlatList
      data={tasksBySchedule}
      keyExtractor={item => item.id.toString()}
      style={styles.tasksContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        return(
          <TouchableOpacity style={[styles.tasksCard, {backgroundColor: item.status === "done" ? "#fff" : "#fff"}]} onPress={() => showModalDetail(item, true)} >
            <View style={styles.tasksCardHeader}>
              <Text style={[{color: "#000", fontWeight: "bold"}, {fontSize: width < 550 ? 16 : 19}]}>{item.judul}</Text>
              <TouchableOpacity style={styles.tasksCardHeaderButton} onPress={() => showModalEditTask(item)}>
                <Feather name="edit" size={22} color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.tasksCardDivider} />
            <View style={styles.tasksCardFooter}>
              <View style={styles.tasksCardFooterLeft}>
                <View style={styles.tasksCardFooterLeft}>
                  <Text style={[styles.tasksDeadlineDate, {fontSize: width < 550 ? 11 : 15}]}>
                    {formatDate(item.deadline_date)}
                  </Text>
                  <Text style={[styles.tasksDeadlineDate, {fontSize: width < 550 ? 11 : 15}]}>
                  {formatTime(item.deadline_time)}
                  </Text>
                </View>
              </View>
              <View style={styles.tasksCardFooterRight}>
              <TouchableOpacity
                onPress={() => showModalPriority(item.prioritas, item.id)}
                style={[
                  styles.tasksCardFooterRightButtonPriority,
                  {
                    backgroundColor:
                      item.prioritas === "low"
                        ? "#3674B5"
                        : item.prioritas === "medium"
                        ? "#FBA518"
                        : "#E52020",
                  },
                ]}
              >
                <Text style={[ {color: "#fff"}, {fontSize: width < 550 ? 11 : 15}]}>
                  {formatPriority(item.prioritas)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => showModalStatus(item.status, item.id)}
                style={[
                  styles.tasksCardFooterRightButtonStatus,
                  {
                    backgroundColor:
                      item.status === "open"
                        ? "#FF7F3E"
                        : item.status === "in_progress"
                        ? "#493D9E"
                        : "#5CB338",
                  },
                ]}
              >
                <Text style={[ {color: "#fff"}, {fontSize: width < 550 ? 11 : 15}]}>
                  {formatStatus(item.status)}
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  );
};

export default ShowGroupTasksByScheduled;