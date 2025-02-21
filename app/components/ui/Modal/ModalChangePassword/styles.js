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
    padding: 15,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black"
  },
  modalCardHeader: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: "#000",
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
    // borderColor: "black",
    padding: 10,
    borderRadius: 5,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  labelInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelInput: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontWeight: "bold"
  },
  inputContainer: {
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
    width: "100%",
    marginBottom: 15
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
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 0
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
    marginTop: -12,
    marginBottom: 10
  },
  buttonDate: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginTop: 10,
    width: "48%",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  buttonTime: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
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
    fontWeight: "bold",
    fontSize: 14,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#3b5ced",
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
    marginBottom: 8
  },
  closeButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 14,
    color: "#fff",
  },

  inputContainerPassword: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingVertical: 3,
    // backgroundColor: "#C2CDF7",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
    marginBottom: 15
  },
  inputPassword: {
    flex: 1,
    paddingVertical: 8,
    width: "100%",
    // backgroundColor: "#C2CDF7",
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10
  },
});

export default styles;