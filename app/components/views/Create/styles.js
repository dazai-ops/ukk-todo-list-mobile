import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '90%',
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    paddingVertical: 20,
    boxShadow: '6 6 0 rgba(0, 0, 0, 1)',
    borderRadius: 15
  },
  cardContainerHeader: {
    backgroundColor: "#C2CD",
    borderWidth: 1,
    borderColor: "black",
    borderBottomColor: "#fff",
    alignItems: "center",
    padding: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  headerContainer:{
    width: "60%",
    backgroundColor: "#dcfc3e",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    borderRadius: 5,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    alignSelf: "center"
  },
  cardContainerForm: {
    // backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    paddingVertical: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
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
    marginBottom: 15
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
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
    marginTop: -9,
    marginBottom: 15
  },
  error: {
    color: "red",
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
    backgroundColor: "#3B5CED",
    padding: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  buttonSubmitDisabled:{
    backgroundColor: "#C2CD",
  },
  buttonSubmitText: {
    color: "#fff",
    fontWeight: "bold"
  }
})

export default styles