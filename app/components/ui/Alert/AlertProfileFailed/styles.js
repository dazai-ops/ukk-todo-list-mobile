import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    width: "80%",
    padding: 15,
    paddingVertical: 30,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  modalCardContent: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#000",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  modalCardContentLabel:{
    fontSize: 15,
    marginBottom: 3,
    alignSelf: "center"
  },
  modalCardHeader: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    borderColor: "#000",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  modalCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#000",
  },
  modalCardButtonCancel: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#C2C",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: "#000",
    color: "#000",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
  },
  modalCardButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
    color: "#fff",
  }
});

export default styles;