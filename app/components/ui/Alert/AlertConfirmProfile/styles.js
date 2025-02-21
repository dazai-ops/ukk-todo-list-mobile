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
    borderColor: "#000"
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center"
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
  modalCardButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },
  modalCardButtonCancel: {
    width: "48%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
    backgroundColor: "#fff",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  modalCardButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    color: "#000",
  },
  modalCardButtonConfirm: {
    width: "48%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
    backgroundColor: "#C2C",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  }
});

export default styles;