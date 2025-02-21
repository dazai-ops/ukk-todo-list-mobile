import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tasksContainer: {
    flex: 1,
    marginTop: 40,
    width: "100%",
  },
  statusTogleContainer: {
    width: "99%",
    alignSelf: "center",
  },
  tasksCard: {
    width: "99%",
    backgroundColor: "#fff",
    marginBottom: 8,
    alignSelf: "center",
    borderWidth: 1,
    padding: 10,
    borderColor: "#000",
    boxShadow: '3 3 0 rgba(0, 0, 0, 1)'
  },
  tasksCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tasksCardHeaderButton: {
    marginBottom: 5,
  },
  tasksCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  tasksCardDivider: {
    width: "100%",
    height: 1,
    marginBottom: 6,
    backgroundColor: "#000",
  },
  tasksCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  tasksCardFooterLeft: {
    flexDirection: "row",
    width: "60%",
    gap: 5
  },
  tasksDeadlineDate: {
    borderWidth: 1,
    padding: 2,
    borderColor: "#000",
  },
  tasksDeadlineTime: {
    borderWidth: 1,
    padding: 2,
    borderColor: "#000",
  },
  tasksCardFooterRight: {
    flexDirection: "row",
    gap: 5,
    width: "40%",
    justifyContent: "flex-end",
    marginTop: 5
  },
  tasksCardFooterRightButtonPriority: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 0,
    paddingHorizontal: 10,
    borderColor: "#000",
    boxShadow: '2 2 0 rgba(0, 0, 0, 1)'
  },
  tasksCardFooterRightButtonStatus: {
    padding: 4,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#000",
    boxShadow: '2 2 0 rgba(0, 0, 0, 1)'
  },
});

export default styles;