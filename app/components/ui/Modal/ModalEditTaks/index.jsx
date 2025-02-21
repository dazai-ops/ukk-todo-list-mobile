import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { formatTimeToDate } from "@/app/utils/formatted";
import { Text, View, TextInput, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import AlertConfirmCrudTask from "../../Alert/AlertConfirmCRUDTask";
import AlertCrudTaskSuccess from "../../Alert/AlertCRUDTaskSuccess";
import AlertCrudTaskFailed from "../../Alert/AlertCRUDTaskFailed";

const ModalEditTask = ({visible, setVisible, dataTask, onTaskUpdated}) => {
  
  const {width} = useWindowDimensions();
  
  // Endpoint API
  const apiUrl = process.env.EXPO_PUBLIC_URL_API

  // Handle show dropdown Priority & Status
  const [openDropdownPriority, setOpenDropdownPriority] = useState(false);
  const [openDropdownStatus, setOpenDropdownStatus] = useState(false);

  // Handle show date & time
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  // Handle form validate
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formError, setFormError] = useState({});
  const [alertMessage, setAlertMessage] = useState("");

  // Handle data dropdown (value)
  const [priority, setPriority] = useState(null);
  const [status, setStatus] = useState(null);
  
  // Set visible modal & alert
  const [visibleModalConfirmUpdateTask, setVisibleModalConfirmUpdateTask] = useState(false);
  const [visibleAlertUpdateTaskSuccess, setVisibleAlertUpdateTaskSuccess] = useState(false);
  const [visibleAlertUpdateTaskFailed, setVisibleAlertUpdateTaskFailed] = useState(false);

  // Initialize form error in begin
  useEffect(() => {
    setFormError({});
  }, [visible])

  // Initialize data for dropdown Priority
  const [itemsPriority, setItemsPriority] = useState([
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ]);

  // Initialize data for dropdown Status
  const [itemsStatus, setItemsStatus] = useState([
    { label: "Open", value: "open" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ]);

  // Menampung data form Inputan
  const [form, setForm] = useState({
    title: "",
    detail: "",
    priority: "",
    status: "",
    deadline_date: "",
    deadline_time: "",
  })
  
  // Set form from selected data task
  useEffect(() => {
    if(visible){
      setForm({
        title: dataTask.judul || "",
        detail: dataTask.detail || "",
        priority: dataTask.prioritas || "",
        status: dataTask.status || "",
        deadline_date: dataTask.deadline_date || "",
        deadline_time: dataTask.deadline_time || ""
      })
    }
  }, [visible])

  // Validate form
  const validateForm = () => {
    let newError = {};

    if(!form.title.trim()){
      newError.title = "Judul harus diisi";
    }

    if(!form.detail.trim()){
      newError.detail = "Detail harus diisi";
    }
    if(!form.priority.trim()){
      newError.priority = "Prioritas harus diisi";
    }

    if(!form.deadline_date){
      newError.date = "Hari harus diisi";
    }
    if(!form.deadline_time){
      newError.time = "Waktu harus diisi";
    }

    setFormError(newError);
    setIsFormFilled(false);

     ("Error",newError)
    return Object.keys(newError).length === 0;
  }

  useEffect(() => {
    setForm({
      ...form,
      status: status
    })
  }, [status])

  useEffect(() => {
    setForm({
      ...form,
      priority: priority,
    })
  }, [priority])

  // Show modal confirm update task
  const handleUpdateTask = () => {
    if(!validateForm()) return
    setVisibleModalConfirmUpdateTask(true)
  }

  // Handle confirm update task
  const handleConfirmUpdateTask = async () => {
    if (!apiUrl || !dataTask?.id) {
      setAlertMessage("Endpoint / data user tidak valid ")
      setVisibleAlertUpdateTaskFailed(true)
      return;
    }

    if(!validateForm()) return

    try{
      const response = await fetch(`${apiUrl}/api/task/${dataTask.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          judul: form.title,
          detail: form.detail,
          prioritas: form.priority,
          status: form.status,
          deadline_date: form.deadline_date,
          deadline_time: form.deadline_time
        }),
      })
      const {success, errors } = await response.json()

      if(success) {
        onTaskUpdated()
        setAlertMessage("Tugas berhasil diubah")
        setVisibleAlertUpdateTaskSuccess(true)
        setVisibleModalConfirmUpdateTask(false)
      } else if (errors) {
        setAlertMessage("Tugas gagal diubah")
        setVisibleAlertUpdateTaskFailed(true)
        setVisibleModalConfirmUpdateTask(false)
      }
    }catch(error){
      setVisibleModalConfirmUpdateTask(false)
      setAlertMessage("Tugas gagal diubah")
      setVisibleAlertUpdateTaskFailed(true)
    }
  }

  return(
    <>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalCard, {width: width < 550 ? "95%" : "80%"}]}>
            <View style={styles.modalCardHeader}>
              <Text style={styles.modalCardTitle}>Edit Tugas</Text>
            </View> 
            <View style={styles.modalCardContent}>
              {form && (
                <View style={styles.cardContainerForm}>

                  {/* Input judul task */}
                  <View>
                    <View style={styles.labelInputContainer}>
                      <Text style={styles.labelInput}>Judul tugas</Text>
                      {formError.title && <Text style={styles.error}>{formError.title}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput  value={form.title} style={styles.input} keyboardType="text" multiline={true} onChangeText={(text) => setForm({ ...form, title: text })} on/>
                    </View>
        
                  </View>

                  {/* Input detail task */}
                  <View>
                    <View style={styles.labelInputContainer}>
                      <Text style={styles.labelInput} value={form.detail}>Detail tugas</Text> 
                      {formError.detail && <Text style={styles.error}>{formError.detail}</Text>}
                    </View>
                    <View style={styles.inputContainer}>
                      <TextInput value={form.detail} style={styles.input} keyboardType="text" multiline={true} onChangeText={(text) => setForm({...form, detail: text})}/>
                    </View>
                  </View>
      
                  {/* Select prioritas */}
                  <View style={styles.priorityAndStatusContainer}>
                    <View style={styles.selectContainer}>
                      <View style={styles.labelInputContainer}>
                        <Text style={styles.labelInput}>Prioritas</Text> 
                        {formError.priority && <Text style={styles.error}>{formError.priority}</Text>}
                      </View>
                      <View style={styles.inputContainer}>
                        <DropDownPicker
                          open={openDropdownPriority}
                          value={form.priority}
                          items={itemsPriority}
                          setOpen={setOpenDropdownPriority}
                          setValue={setPriority}
                          setItems={setItemsPriority}
                          placeholder="Pilih salah satu"
                          style={styles.selectPriority}
                        />
                      </View>
                    </View>

                    {/* Select status */}
                    <View style={styles.selectContainer}>
                      <View style={styles.labelInputContainer}>
                        <Text style={styles.labelInput}>Status</Text> 
                        {formError.status && <Text style={styles.error}>{formError.status}</Text>}
                      </View>
                      <View style={styles.inputContainer}>
                        <DropDownPicker
                          open={openDropdownStatus}
                          value={form.status}
                          items={itemsStatus}
                          setOpen={setOpenDropdownStatus}
                          setValue={setStatus}
                          setItems={setItemsStatus}
                          placeholder="Pilih salah satu"
                          style={styles.selectPriority}
                        />
                      </View>
                    </View>
                  </View>
                  
                  {/* Date and time deadline */}
                  <View>
                    <Text style={styles.labelInput}>Deadline tugas</Text>
                    <View style={styles.dateAndTimeContainer}>
                      <TouchableOpacity onPress={() => setShowDate(true)} style={[styles.buttonDate, formError.date && {backgroundColor: "red"}]}>
                        <Text style={{alignSelf: "center", color: formError.date ? "#fff" : "#000"}}>
                          {form.deadline_date ? new Date(form.deadline_date).toLocaleDateString("id-ID") : ""}
                        </Text>
                      </TouchableOpacity>
      
                      {showDate && (
                        <DateTimePicker
                          value={form.deadline_date ? new Date(form.deadline_date) : new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            setShowDate(false); 
                            if (selectedDate){
                              setForm((form) => ({...form, deadline_date: selectedDate.toISOString().split("T")[0]}))
                            }
                          }}
                        />
                      )}
                    
                      <TouchableOpacity onPress={() => setShowTime(true)} style={[styles.buttonTime, formError.time && {backgroundColor: "red"}]}>
                        <Text style={{alignSelf: "center", color: formError.time ? "#fff" : "#000"}}>
                          {form.deadline_time ? new Date(`1970-01-01T${form.deadline_time}`).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </Text>
                      </TouchableOpacity>
      
                      {showTime && (
                        <DateTimePicker
                          value={formatTimeToDate(form.deadline_time)}
                          mode="time"
                          display="default"
                          onChange={(event, selectedTime) => {
                            setShowTime(false);
                            if (selectedTime){
                              setForm((form) => ({...form, deadline_time: selectedTime.toTimeString().split(" ")[0]}))
                            } 
                          }}
                        />
                      )}
                    </View>
                  </View>

                  <View>
                    <TouchableOpacity style={[styles.buttonSubmit, !isFormFilled && styles.buttonSubmitDisabled]} onPress={handleUpdateTask}>
                      <Text style={styles.buttonSubmitText}>Simpan Perubahan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>Batal</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      <AlertConfirmCrudTask
         visible={visibleModalConfirmUpdateTask}
         setVisible={setVisibleModalConfirmUpdateTask}
         onConfirm={handleConfirmUpdateTask}
         message={"Yakin mengubah data tugas ini?"}
      />
      <AlertCrudTaskSuccess
        visible={visibleAlertUpdateTaskSuccess}
        setVisible={() => {
          setVisibleAlertUpdateTaskSuccess(false)
          setVisible(false)
        }}
        message={alertMessage}
        titleName={"Berhasil"}
      />

      <AlertCrudTaskFailed
        visible={visibleAlertUpdateTaskFailed}
        setVisible={setVisibleAlertUpdateTaskFailed}
        message={alertMessage}
        titleName={"Gagal"}
      />
    </>
  )
}

export default ModalEditTask