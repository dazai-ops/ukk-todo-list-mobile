import { useEffect, useState } from "react";
import { Provider } from 'react-native-paper';
import { useWindowDimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, TouchableOpacity} from "react-native";
import { usePushNotification } from "../../../services/pushToken";
import { formatStatus, formatDate, formatPriority } from "../../../utils/formatted";
import { getCurrentTime, getTodayDate, getTomorrowDate } from "../../../utils/getDateAndTime";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EmptyTask from "../../../components/ui/ListTask/EmptyTask";
import ShowAllTasksByStatus from "../../../components/ui/ListTask/AllTasksByStatus";
import ShowAllTasksByPriority from "../../../components/ui/ListTask/AllTasksByPriority";
import ShowAllTasksBySchedule from "../../ui/ListTask/AllTasksByScheduled";
import ShowGroupTasksByStatus from "../../../components/ui/ListTask/GroupTasksByStatus";
import ShowGroupTasksByPriority from "../../../components/ui/ListTask/GroupTasksByPriority";
import ShowGroupTasksByScheduled from "../../../components/ui/ListTask/GroupBySchedule";
import ModalDetailTask from "../../../components/ui/Modal/ModalDetailTask";
import ModalChangeStatus from "../../ui/Modal/ModalChangeStatus";
import ModalChangePriority from "../../ui/Modal/ModalChangePriority";
import ModalEditTask from "../../ui/Modal/ModalEditTaks";
import ModalChangeTabType from "../../ui/Modal/ModalChangeTabType";
import AlertConfirmCrudTask from "../../ui/Alert/AlertConfirmCRUDTask";
import AlertCrudTaskSuccess from "../../ui/Alert/AlertCRUDTaskSuccess";
import AlertCrudTaskFailed from "../../ui/Alert/AlertCRUDTaskFailed";

export default function DashboardView() {
  
  // Handle get tasks if page focused (on page)
  const isFocused = useIsFocused();
  const {width} = useWindowDimensions();

  // Handle push notification token (Expo push token)
  // Server / pushToken (file name)
  const expoPushToken = usePushNotification()
   ("Expo push token: ", expoPushToken)

  // Endpoint API
  const apiUrl = process.env.EXPO_PUBLIC_URL_API;

  // Lists for filter & tab component
  const STATUS = ["All", "Open", "In Progress", "Done"];
  const PRIORITY = ["All", "Low", "Medium", "High"];
  const SCHEDULED = ["All", "Hari Ini", "Besok", "Terlambat"];

  // State handle Visible modal
  const [visibleModalDetail, setVisibleModalDetail] = useState(false);
  const [visibleModalStatus, setVisibleModalStatus] = useState(false);
  const [visibleModalPriority, setVisibleModalPriority] = useState(false);
  const [visibleModalEditTask, setVisibleModalEditTask] = useState(false);
  const [visibleModalConfirmDeleteTask, setVisibleModalConfirmDeleteTask] = useState(false);
  const [visibleModalChangeTab, setVisibleModalChangeTab] = useState(false);
  const [visibleAlertSuccess, setVisibleAlertSuccess] = useState(false);
  const [visibleAlertFailed, setVisibleAlertFailed] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // This state for data tasks in began
  const [dataTasks, setDataTasks] = useState([]);

  // State for determine selected tab in all display mode
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedScheduled, setSelectedScheduled] = useState("All");
  
  // State for detail task & delete by id
  const [detailTask, setDetailTask] = useState({});
  const [deleteById, setDeleteById] = useState("");

  // State for current status & priority (Tab change)
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentPriority, setCurrentPriority] = useState("");
  const [currentTab, setCurrentTab] = useState("By Status");

  // Sort by date & title (asc or des)
  const [orderByDate, setOrderByDate] = useState("des");
  const [orderByTitle, setOrderByTitle] = useState("des");

  // State for expandable list (by togle)
  const [expandStatus, setExpandStatus] = useState({
    open: true,
    in_progress: true,
    done: true
  })
  const [expandPriority, setExpandPriority] = useState({
    low: true,
    medium: true,
    high: true
  })
  const [expandSchedule, setExpandSchedule] = useState({
    "Hari Ini": true,
    "Besok": true,
    "Terlambat": true,
  });

  // Handle fetching data tasks
  // Yang pasti by id user yang login ya..
  const handleGetTask = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      const userId = JSON.parse(user).id;
      const response = await fetch(`${apiUrl}/api/tasks/user/${userId}`, {
        method: "GET",
      });

      const result = await response.json();

      if (result.message === "Task tidak ditemukan") {
        setDataTasks([])
         ("Tidak ada tugas")
      } else if (!result.tasks) {
        setAlertMessage("Terjadi kesalahan saat mengambil tugas")
        setVisibleAlertFailed(true)
        setTimeout(() => {
          setVisibleAlertFailed(false)
        }, 1000)
      } else {
        setDataTasks(result.tasks || []);
      }
    } catch (error) {
      setAlertMessage("Ada gangguan di server")
      setVisibleAlertFailed(true)
      return
    }
  };

  // Handle modal edit task
  const handleEditTask = (item) => {
    setDetailTask(item)
    setVisibleModalEditTask(true)
  }

  // Do when crud task success
  const handleRetriveTasks = () => {
    handleGetTask();
  }

  // Handle change type Tab (By Status, By Prioritas, Terjadwal)
  const handleTypeTabChange = (tab) => {
    setCurrentTab(tab)
    setVisibleModalChangeTab(false)
  }

  // Handle toggle expand list (In Tab By Status)
  const toggleStatus = (status) => {
    setExpandStatus((prev) => ({
      ...prev,
      [status]: !prev[status]
    }))
  }

  // Handle toggle expand list (In Tab By Prioritas)
  const togglePriority = (priority) => {
    setExpandPriority((prev) => ({
      ...prev,
      [priority]: !prev[priority]
    }))
  }

  // Handle toggle expand list (In Tab Terjadwal)
  const toggleSchedule = (schedule) => {
    setExpandSchedule((prev) => ({
      ...prev,
      [schedule]: !prev[schedule]
    }));
  };

  // Handle confirm delete task (Alert)
  const handleConfirmDeleteTask = () => {
    setDeleteById(detailTask.id)
    setVisibleModalConfirmDeleteTask(true)
  }

  // After alert confirm delete = handle delete task
  const handleDeleteTask = async () => {

    try{
      const response = await fetch(`${apiUrl}/api/task/${deleteById}`, {
        method: "DELETE",
      })

      const {success, errors } = await response.json()

      if(success){
        handleRetriveTasks()
        setVisibleModalConfirmDeleteTask(false)
        setVisibleModalDetail(false)
        setAlertMessage("Tugas berhasil dihapus")
        setVisibleAlertSuccess(true)
      }
    }catch(error){
       ("Error deleting task: ", error)
    }
  }

  useEffect(() => {
    if(isFocused){
      handleGetTask();
    }
  }, [isFocused]);

  useEffect(() => {
      handleGetTask();
  }, [currentTab]);

  // Get task count by status, priority, schedule
  // Count each task (by Status)
  const taskCountByStatus = dataTasks.reduce((acc, task) => {
    const status = formatStatus(task.status);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {})

  // Count each task (by priority)
  const taskCountByPriority = dataTasks.reduce((acc, task) => {
    const priority = formatPriority(task.prioritas);
    acc[priority] = (acc[priority] || 0) + 1;
    return acc;
  }, {})

  // Count each task (by schedule)
  const today = getTodayDate()
  const tomorrow = getTomorrowDate()
  const currentTime = getCurrentTime();
  const taskCountBySchedule = dataTasks.reduce((acc, task) => {
    
    if(task.deadline_date === today){
      acc["Hari Ini"] = (acc["Hari Ini"] || 0) + 1;
    }else if(task.deadline_date === tomorrow){
      acc["Besok"] = (acc["Besok"] || 0) + 1;
    }else if(task.deadline_date < today && task.status !== "done"){
      acc["Terlambat"] = (acc["Terlambat"] || 0) + 1;
    }

    if(task.deadline_date === today){
      if(task.deadline_time <= currentTime && task.status !== "done"){
        acc["Terlambat"] = (acc["Terlambat"] || 0) + 1;
      }
    }

    return acc
  }, {})
  
  const showModalDetail = (item) => {
    setVisibleModalDetail(true);
    setDetailTask(item);
  }
  const showModalStatus = (status, id) => {
    setVisibleModalStatus(true);
    setCurrentStatus({status, id})
  }

  const showModalPriority = (priority, id) => {
    setVisibleModalPriority(true);
    setCurrentPriority({priority, id})
  }
  
  // For tab By Status
  const filteredTasks = selectedStatus === "All" ? dataTasks : dataTasks.filter(task => formatStatus(task.status) === selectedStatus)
  // For tab By Prioritas
  const filteredTasksByPriority = selectedPriority === "All" ? dataTasks : dataTasks.filter(task => formatPriority(task.prioritas) === selectedPriority)
  // For tab Terjadwal
  const filteredTasksByScheduled = selectedScheduled === "All" ? dataTasks : dataTasks
  
  // Sorting tasks by Date
  const sortTaskByDate = () => {
    const sortedTasks = [...dataTasks].sort((a, b) => {
      return orderByDate === "asc"
        ? new Date(a.deadline_date) - new Date(b.deadline_date)
        : new Date(b.deadline_date) - new Date(a.deadline_date);
    })

    setDataTasks(sortedTasks);
    setOrderByDate(orderByDate === "asc" ? "desc" : "asc");
  }

  // Sorting tasks by Title
  const sortTaskByTitle = () => {
    const sortedTasks = [...dataTasks].sort((a, b) => {
      return orderByTitle === "asc"
        ? a.judul.localeCompare(b.judul)
        : b.judul.localeCompare(a.judul);
    })

    setDataTasks(sortedTasks);
    setOrderByTitle(orderByTitle === "asc" ? "desc" : "asc");
  }

  return (
    <Provider>
      <View style={styles.mainContainer}>
        {/* Filter Status */}
        {currentTab === "By Status" ? (
          <View style={styles.filterStatusContainer}>
            {STATUS.map(status => (
              <TouchableOpacity
                key={status}
                style={[styles.filterStatusButton, selectedStatus === status && styles.filterStatusButtonActive]}
                onPress={() => setSelectedStatus(status)}
              >
                <Text style={[{color: "#000"}, {fontSize: width < 550 ? 11 : 15} ]}>
                  {status} ({status === "All" ? dataTasks.length : taskCountByStatus[status] || 0})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : currentTab === "By Prioritas" ? (
          <View style={styles.filterStatusContainer}>
            {PRIORITY.map(priority => (
              <TouchableOpacity
                key={priority}
                style={[styles.filterStatusButton, selectedPriority === priority && styles.filterStatusButtonActive]}
                onPress={() => setSelectedPriority(priority)}
              >
                <Text style={[{color: "#000"}, {fontSize: width < 550 ? 11 : 15} ]}>
                  {priority} ({priority === "All" ? dataTasks.length : taskCountByPriority[priority] || 0})
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : currentTab === "Terjadwal" ? (
          <View style={styles.filterStatusContainer}>
            {SCHEDULED.map(scheduled => (
              <TouchableOpacity
                key={scheduled}
                style={[styles.filterStatusButton, selectedScheduled === scheduled && styles.filterStatusButtonActive]}
                onPress={() => setSelectedScheduled(scheduled)}
              >
                <Text style={[{color: "#000"}, {fontSize: width < 550 ? 11 : 15} ]}>
                  {scheduled} {scheduled !== "All" && `(${taskCountBySchedule[scheduled] || 0})`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : null}

        <View style={styles.divider}/>

        {/* Filter Sorting */}
        <View style={styles.sortingContainer}>
          <View style={styles.sortingButton}>
            <TouchableOpacity 
              style={styles.buttonDateSorting} 
              onPress={sortTaskByDate}
              disabled={dataTasks.length === 0}
            >
              <Text style={[{color: "#000"}, {fontSize: width < 550 ? 11 : 15} ]}>Tanggal ({orderByDate == "asc" ? "des" : "asc"})</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.buttonTitleSorting} 
              onPress={sortTaskByTitle}
              disabled={dataTasks.length === 0}
            >
              <Text style={[{color: "#000"}, {fontSize: width < 550 ? 11 : 15} ]}>Judul ({orderByTitle == "asc" ? "des" : "asc"})</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.selectTabContainer} onPress={() => setVisibleModalChangeTab(true)}>
            <Text style={[{color: "#000"}, {fontSize: width < 550 ? 11 : 15} ]}>Filter Tampilan</Text>
          </TouchableOpacity>
        </View>
        
        { currentTab === "By Status" && filteredTasks.length > 0 && selectedStatus === "All" ? (
          // Render all tasks by Status
          <ShowAllTasksByStatus
            filteredTasks={filteredTasks}
            showModalDetail={showModalDetail}
            toggleStatus={toggleStatus}
            expandStatus={expandStatus}
            showModalStatus={showModalStatus}
            showModalPriority={showModalPriority}
            showModalEditTask={handleEditTask}
          />
          ) : currentTab === "By Prioritas" && filteredTasksByPriority.length > 0 && selectedPriority === "All" ? (
            // Render all tasks by Priority
            <ShowAllTasksByPriority
              filteredTasks={filteredTasksByPriority}
              showModalDetail={showModalDetail}
              togglePriority={togglePriority}
              expandPriority={expandPriority}
              showModalStatus={showModalStatus}
              showModalPriority={showModalPriority}
              showModalEditTask={handleEditTask}
            />
          ) : currentTab === "Terjadwal" && filteredTasksByScheduled.length > 0 && selectedScheduled === "All" ? (
            // Render all tasks by Scheduled
            <ShowAllTasksBySchedule
              filteredTasks={filteredTasksByScheduled}
              showModalDetail={showModalDetail}
              toggleSchedule={toggleSchedule}
              expandSchedule={expandSchedule}
              showModalStatus={showModalStatus}
              showModalPriority={showModalPriority}
              showModalEditTask={handleEditTask}
            />
          ) : currentTab === "By Status" && selectedStatus != "All" ? (
            // Render filtered tasks by Status
            <ShowGroupTasksByStatus
              filteredTasks={filteredTasks}
              showModalDetail={showModalDetail}
              showModalStatus={showModalStatus}
              showModalPriority={showModalPriority}
              showModalEditTask={handleEditTask}
            />
          ) : currentTab === "By Prioritas" && selectedPriority != "All" ? (
            // Render filtered tasks by Priority
            <ShowGroupTasksByPriority
              filteredTasks={filteredTasksByPriority}
              showModalDetail={showModalDetail}
              showModalStatus={showModalStatus}
              showModalPriority={showModalPriority}
              showModalEditTask={handleEditTask}
            />
          ) : currentTab === "Terjadwal" && selectedScheduled != "All" ? (
            // Render filtered tasks by Scheduled
            <ShowGroupTasksByScheduled
              filteredTasks={filteredTasksByScheduled}
              selectedScheduled={selectedScheduled}
              showModalDetail={showModalDetail}
              showModalStatus={showModalStatus}
              showModalPriority={showModalPriority}
              showModalEditTask={handleEditTask}
            />
          ) : (
            // Render empty task
            <EmptyTask
              styles={styles}
            />
          )
        }

        {/* Modal detail task */}
        <ModalDetailTask 
          visible={visibleModalDetail} 
          detailTask={detailTask}
          setVisible={setVisibleModalDetail}
          formatDate={formatDate}
          handleDeleteTask={handleConfirmDeleteTask}
        />

        {/* Modal change status */}
        <ModalChangeStatus
          visible={visibleModalStatus}
          setVisibleModalStatus={setVisibleModalStatus}
          selectedTask={currentStatus}
          onStatusChanged={handleRetriveTasks}
        />

        {/* Modal change priority */}
        <ModalChangePriority
          visible={visibleModalPriority}
          setVisibleModalPriority={setVisibleModalPriority}
          selectedTask={currentPriority}
          onPriorityChanged={handleRetriveTasks}
        />

        {/* Modal change tab type */}
        <ModalChangeTabType
          visible={visibleModalChangeTab}
          setVisible={setVisibleModalChangeTab}
          selectedTab={currentTab}
          handleTypeTabChange={handleTypeTabChange}
        />

        {/* Modal edit task */}
        <ModalEditTask
          visible={visibleModalEditTask}
          setVisible={setVisibleModalEditTask}
          dataTask={detailTask}
          onTaskUpdated={handleRetriveTasks}
        />
        
        {/* Alert confirm task action */}
        <AlertConfirmCrudTask
          visible={visibleModalConfirmDeleteTask}
          setVisible={setVisibleModalConfirmDeleteTask}
          onConfirm={handleDeleteTask}
          onTaskDeleted={handleRetriveTasks}
          type="delete"
          pageName="status"
          message={`Tekan "Hapus" untuk melanjutkan`}
        />

        {/* Alert crud task success */}
        <AlertCrudTaskSuccess
          visible={visibleAlertSuccess}
          setVisible={setVisibleAlertSuccess}
          message={alertMessage}
          titleName={"Berhasil"}
        />
        {/* Alert crud task failed */}
        <AlertCrudTaskFailed
          visible={visibleAlertFailed}
          setVisible={setVisibleAlertFailed}
          message={alertMessage}
          titleName={"Gagal"}
        />
      
      </View>
    </Provider>
  )
}

