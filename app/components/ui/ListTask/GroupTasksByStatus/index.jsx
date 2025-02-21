import { useWindowDimensions } from "react-native";
import { View, Text, FlatList, TouchableOpacity } from "react-native"
import { formatPriority, formatStatus, formatTime, formatDate } from "@/app/utils/formatted"
import styles from "./styles"
import Feather from '@expo/vector-icons/Feather';

const ShowGroupTasksByStatus = ({filteredTasks, showModalDetail, showModalStatus, showModalPriority, showModalEditTask}) => {
  
  const {width} = useWindowDimensions();

  return(
    <FlatList
      data={filteredTasks}
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
                <Text style={{ color: "#fff", fontSize: 11 }}>
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
                <Text style={{ color: "#fff", fontSize: 11 }}>
                  {formatStatus(item.status)}
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )
      }}
    />
  )
}

export default ShowGroupTasksByStatus