import { Text, View, TextInput, TouchableOpacity } from "react-native"
import { useEffect, useRef, useState } from "react"
import { taskCreate } from "@/app/hooks/Create"
import { useWindowDimensions } from "react-native"
import styles from "./styles"
import DateTimePicker from "@react-native-community/datetimepicker"
import DropDownPicker from "react-native-dropdown-picker"
import AlertCrudTaskSuccess from "../../ui/Alert/AlertCRUDTaskSuccess"

export default function CreateTaskView() {

  const { width } = useWindowDimensions();

  const [form, setForm] = useState({
    title: "",
    detail: "",
    priority: "",
    deadline_date: "",
    deadline_time: "",
  })
  const [callback, setCallback] = useState(false)

  const inputRef = useRef({})
  if (!inputRef.current) inputRef.current = {}

  useEffect(() => {
    if(callback) {
      setForm({
        title: "",
        detail: "",
        priority: "",
        deadline_date: "",
        deadline_time: "",
      })
      setCallback(false)
    }
  }, [callback])
  
  const {showSelectPriority, setShowSelectPriority, valueSelectPriority, 
    setValueSelectPriority, itemsSelectPriority, setItemsSelectPriority, 
    date, setDate, time, setTime, showDate, setShowDate, 
    showTime, setShowTime, handleNewTask, isFormFilled, 
    formError, visibleAlertCreateTaskSuccess, setVisibleAlertCreateTaskSuccess, 
    successMessage
  } = taskCreate(form, setCallback)

  return(
    <>
      <View style={styles.mainContainer}>
        <View style={[styles.cardContainer, {width: width < 550 ? "90%" : "75%"}]}>
          <View style={{width: "100%"}}>
            <View style={styles.cardContainerHeader}>
              <View style={styles.headerContainer}>
                <Text style={styles.cardTitle}>
                  Tambah Tugas
                </Text>
              </View>
            </View>
            <View style={styles.cardContainerForm}>

              {/* Input judul task */}
              <View style={styles.labelInputContainer}>
                <Text style={styles.labelInput}>Judul tugas</Text>
                {formError.title && <Text style={styles.error}>{formError.title}</Text>}
              </View>
              <View style={styles.inputContainer}>
                <TextInput value={form.title} style={styles.input} keyboardType="text" onChangeText={(text) => setForm({ ...form, title: text })} on/>
              </View>

              {/* Input detail task */}
              <View style={styles.labelInputContainer}>
                <Text style={styles.labelInput}>Detail tugas</Text> 
                {formError.detail && <Text style={styles.error}>{formError.detail}</Text>}
              </View>
              <View style={styles.inputContainer}>
                <TextInput value={form.detail} style={[styles.input, {height: 100}]} keyboardType="text" multiline={true} onChangeText={(text) => setForm({...form, detail: text})}/>
              </View>

              {/* Select prioritas */}
              <View style={styles.labelInputContainer}>
                <Text style={styles.labelInput}>Prioritas tugas</Text> 
                {formError.priority && <Text style={styles.error}>{formError.priority}</Text>}
              </View>
              <View style={styles.inputContainer}>
                <DropDownPicker
                  open={showSelectPriority}
                  value={valueSelectPriority}
                  items={itemsSelectPriority}
                  setOpen={setShowSelectPriority}
                  setValue={setValueSelectPriority}
                  setItems={setItemsSelectPriority}
                  placeholder="Pilih prioritas"
                  style={styles.selectPriority}
                  onChangeValue={(value) => setForm({...form, priority: value})}
                />
              </View>
              
              {/* Date and time deadline */}
              <View>
                <Text style={styles.labelInput}>Deadline tugas</Text>
                <View style={styles.dateAndTimeContainer}>

                  {/* Button trigger show Select date */}
                  <TouchableOpacity onPress={() => setShowDate(true)} style={[styles.buttonDate, formError.deadline_date && {backgroundColor: "red"}]}>
                    <Text style={{alignSelf: "center", color: formError.deadline_date ? "#fff" : "#000"}}>
                      {date ? new Date(date).toLocaleDateString("id-ID") : "Tanggal"}
                    </Text>
                  </TouchableOpacity>

                  {showDate && (
                    <DateTimePicker
                      value={date || new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDate(false); 
                        if (selectedDate){
                          setDate(selectedDate);
                          setForm((form) => ({...form, deadline_date: selectedDate}))
                        }
                      }}
                    />
                  )}
                
                  {/* Button triger show Select Time */}
                  <TouchableOpacity onPress={() => setShowTime(true)} style={[styles.buttonTime, formError.deadline_time && {backgroundColor: "red"}]}>
                    <Text style={{alignSelf: "center", color: formError.deadline_time ? "#fff" : "#000"}}>
                      {time ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "Waktu"}
                    </Text>
                  </TouchableOpacity>

                  {showTime && (
                    <DateTimePicker
                      value={time || new Date()}
                      mode="time"
                      display="default"
                      onChange={(event, selectedTime) => {
                        setShowTime(false);
                        if (selectedTime){
                          setTime(selectedTime);
                          setForm((form) => ({...form, deadline_time: selectedTime}))
                        } 
                      }}
                    />
                  )}
                </View>
              </View>
              <TouchableOpacity style={[styles.buttonSubmit, !isFormFilled && styles.buttonSubmitDisabled]} onPress={handleNewTask}>
                <Text style={styles.buttonSubmitText}>Tambahkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <AlertCrudTaskSuccess
        visible={visibleAlertCreateTaskSuccess}
        setVisible={setVisibleAlertCreateTaskSuccess}
        message={successMessage}
        titleName="Berhasil Ditambahkan"
      />
    </>
  )
}