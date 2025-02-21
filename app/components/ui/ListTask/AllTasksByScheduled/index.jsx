import { AntDesign } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { formatStatus } from "../../../../utils/formatted";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { formatPriority, formatTime, formatDate } from "@/app/utils/formatted";
import { getTodayDate, getTomorrowDate } from "../../../../utils/getDateAndTime";
import styles from "./styles";
import Feather from '@expo/vector-icons/Feather';

const ShowAllTasksBySchedule = ({ filteredTasks, showModalDetail, toggleSchedule, expandSchedule, showModalStatus, showModalPriority, showModalEditTask }) => {

  const {width} = useWindowDimensions();

  // Get today's date
  // Format: YYYY-MM-DD
  const today = getTodayDate()

  // Get tomorrow's date
  // Format: YYYY-MM-DD (DD+1)
  const formattedTomorrow = getTomorrowDate()

  return (
    <FlatList
      data={["Hari Ini", "Besok", "Terlambat"]}
      keyExtractor={(schedule) => schedule}
      style={styles.tasksContainer}
      showsVerticalScrollIndicator={false}
      renderItem={({ item: schedule }) => {
        let tasksBySchedule = [];

        if (schedule === "Hari Ini") {
          tasksBySchedule = filteredTasks.filter(
            (task) => task.deadline_date === today
          );
        } else if (schedule === "Besok") {
          tasksBySchedule = filteredTasks.filter(
            (task) => task.deadline_date === formattedTomorrow
          );
        } else if (schedule === "Terlambat") {
          tasksBySchedule = filteredTasks.filter((task) => {
            const deadlineDateTime = new Date(`${task.deadline_date}T${task.deadline_time}`);
            return deadlineDateTime < new Date() && task.status != "done";
          });
        }

        return tasksBySchedule.length > 0 ? (
          <View key={schedule}>
            <View style={styles.statusTogleContainer}>
              <TouchableOpacity onPress={() => toggleSchedule(schedule)} style={styles.statusTogle}>
                <Text style={[styles.statusTogleName, {fontSize: width < 550 ? 12 : 15}]}>{schedule}</Text>
                <AntDesign name={expandSchedule[schedule] ? "down" : "up"} size={12} color="#000" />
              </TouchableOpacity>
            </View>

            {expandSchedule[schedule] && tasksBySchedule.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.tasksCard, { backgroundColor: "#fff" }]}
                onPress={() => showModalDetail(item, true)}
              >
                <View style={styles.tasksCardHeader}>
                  <Text style={[{color: "#000", fontWeight: "bold"}, {fontSize: width < 550 ? 16 : 19}]}>{item.judul}</Text>
                  <TouchableOpacity style={styles.tasksCardHeaderButton} onPress={() => showModalEditTask(item)}>
                    <Feather name="edit" size={22} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.tasksCardDivider} />
                <View style={styles.tasksCardFooter}>
                  <View style={styles.tasksCardFooterLeft}>
                    <Text style={[styles.tasksDeadlineDate, {fontSize: width < 550 ? 11 : 15}]}>
                      {formatDate(item.deadline_date)}
                    </Text>
                    <Text style={[styles.tasksDeadlineTime, {fontSize: width < 550 ? 11 : 15}]}>
                      {formatTime(item.deadline_time)}
                    </Text>
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
            ))}
          </View>
          // <Text>Hello</Text>
        ) : null;
      }}
    />

    // <Text>Hello</Text>
  );
};

export default ShowAllTasksBySchedule;
