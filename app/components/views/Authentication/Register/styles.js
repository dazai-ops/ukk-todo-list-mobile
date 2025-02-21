import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer:{
    width: "88%",
    borderRadius: 10,
    boxShadow: '6 6 0 rgba(0, 0, 0, 1)',
  },
  cardContainerTablet:{
    width: "65%",
  },
  headerContainer:{
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  cardContainerHeader:{
    width: "100%",
    paddingVertical: 25,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderBottomWidth: 0,
    borderBottomColor: "black",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContainerForm: {
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    shadowColor: '#000',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cardTitle: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#000"
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
  },
  inputContainer: {
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
    width: "100%",
    marginBottom: 15
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
  },

  // Styling input password & konfirmasi password
  inputContainerPassword: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingVertical: 3,
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
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    marginRight: 10
  },
  // End styling input password

  error: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: -10
  },
  buttonSubmit: {
    backgroundColor: "#C2C",
    padding: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: '#000',
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  buttonSubmitDisabled: {
    backgroundColor: "#C2CD",
  },
  buttonSubmitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textBottom: {
    marginTop: 35,
    fontSize: 14,
    marginBottom: 20
  },
  linkBottom: {
    color: "blue",
  },
});

export default styles