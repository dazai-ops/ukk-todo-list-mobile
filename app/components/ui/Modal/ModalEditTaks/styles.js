import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 10,
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black"
  },
  modalCardHeader: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 14,
    marginTop: -5,
    borderColor: "#000",
    backgroundColor: "#dcfc3e",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  modalCardTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    alignSelf: "center"
  },
  modalCardContent: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 8,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  cardContainerForm: {
    // backgroundColor: "#F6F6F6",
    // borderWidth: 1,
    // borderColor: "black",
    // padding: 10,
    paddingVertical: 10,
    // borderRadius: 10,
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10
  },
  labelInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelInput: {
    alignSelf: "flex-start",
    marginBottom: 3,
    fontWeight: "bold"
  },
  inputContainer: {
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
    width: "100%",
    marginBottom: 13
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
  },
  priorityAndStatusContainer:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectContainer: {
    width: "48%",
  },
  selectPriority: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 0,
  },
  dateAndTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: -8,
    marginBottom: 10
  },
  error: {
    color: "red",
  },
  buttonDate: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    paddingVertical: 14,
    marginTop: 10,
    width: "48%",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  buttonTime: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    paddingVertical: 14,
    marginTop: 10,
    width: "48%",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  buttonSubmit: {
    backgroundColor: "#C2C",
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  buttonSubmitDisabled:{
    backgroundColor: "#C2C",
  },
  buttonSubmitText: {
    color: "#fff",
    fontWeight: "bold"
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#3B5CED",
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  closeButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
    color: "#fff",
  }
});

export default styles;