import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    width: "90%",
    alignItems: "center",
    padding: 15,
    paddingVertical: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#fff"
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
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#000",
  },
  modalCardContent: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#000",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  filterStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterStatusButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "black",
    boxShadow: '2 2 0 rgba(0, 0, 0, 1)'
  },
  filterStatusButtonActive: {
    backgroundColor: "#C2C"
  },
  filterStatusButtonText: {
    color: "black", 
    fontSize: 15,
    fontWeight: "bold"
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#C2C",
    padding: 10,
    color: "black",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#000",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  closeButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 12,
    color: "#fff",
  }
});

export default styles;