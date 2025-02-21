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
    padding: 13,
    paddingVertical: 30,
    borderRadius: 15,
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
    borderRadius: 5,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  modalCardContentLabel:{
    fontSize: 13,
    marginBottom: 3,
    fontWeight: "bold",
    marginTop: 5
  },
  modalCardContentTitle: {
    width: "100%",
    // backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  modalCardContentDetail: {
    width: "100%",
    // backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  modalCardContentDeadline:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalCardContentDeadlineDate: {
    width: "49%",
    // backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  modalCardContentDeadlineTime: {
    width: "49%",
    // backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'

  },
  modalCardContentPriority: {
    width: "100%",
    // backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'

  },
  modalCardContentStatus: {
    width: "100%",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  dividerBottom: {
    marginTop: 15,
    marginBottom: 15,
    height: 2,
    width: "100%",
    backgroundColor: "black"
  },
  modalCardButton:{
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  closeButton: {
    backgroundColor: "#3b5ced",
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
    marginBottom: 10
  },
  deleteButton: {
    // width: "49%",
    backgroundColor: "#D91656",
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)',
    marginBottom: 10
  },
  closeButtonText: {
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 15,
    color: "#fff",
  }
});

export default styles;