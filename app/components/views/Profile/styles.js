import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileContainer: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5,
    boxShadow: '5 5 0 rgba(0, 0, 0, 1)',
  },
  profileDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 15
  },
  profileEmail: {
    fontSize: 1
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    backgroundColor: "#C2C",
    marginRight: 10
  },
  logoutButtonText: {
    padding: 8,
    paddingHorizontal: 15,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff"
  },
  divider: {
    width: "100%",
    height: 3,
    backgroundColor: "#000",
    marginVertical: 10
  },

  // Bawah
  totalTasksContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    padding:10,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical:10,
  },
  totalTasksContainerLeft: {
    width: "48%",
    gap: 10
  },
  totalTasksContainerRight: {
    width: "48%",
    gap: 10
  },
  totalTask: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 10,
    borderRadius: 5,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  taskHeader: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5
  },
  divider: {
    width: "100%",
    marginTop: 5,
    marginBottom: 20,
    height: 2,
    backgroundColor: "#000"
  },
  taskCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },

  // Edit Profile
  editProfileContainer: {
    width: "95%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 5,
    boxShadow: '5 5 0 rgba(0, 0, 0, 1)',
    padding:10,
    gap: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  editProfileHeader: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#dcfc3e",
    boxShadow: '5 5 0 rgba(0, 0, 0, 1)',
    padding:10,
  },
  editProfileText: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center"
  },
  editProfileFormContainer: {
    width: "100%",
  },
  editProfileInput: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  editProfileForm: {
    width: "100%",
  },
  editProfileFormInputContainer: {
    width: "100%",
  },
  editProfileFormLabel: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5
  },
  editProfileFormInput: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  editProfileFormButton: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginTop: -10,
    marginBottom: 10,
    backgroundColor: "#C2C",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  editProfileFormButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#fff",
  },
  inputMainContainer: {
    marginBottom: 15
  },
  labelInputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -15,
    marginBottom: 5
  },
  labelInput: {
    alignSelf: "flex-start",
    fontWeight: "bold"
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
  error: {
    color: "red",
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
})

export default styles