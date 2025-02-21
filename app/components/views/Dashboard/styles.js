import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: "#fff",
  },
  filterStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterStatusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    boxShadow: '2 2 0 rgba(0, 0, 0, 1)'
  },
  filterStatusButtonActive: {
    backgroundColor: "#d946ef"
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#000",
    marginTop: 10
  },

  // Sorting Container
  sortingContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
    justifyContent: "space-between",
    marginBottom: -20
  },
  sortingButton: {
    flexDirection: "row",
    gap: 5,
    padding: 0
  },
  buttonDateSorting: {
    padding: 5,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    boxShadow: '2 2 0 rgba(0, 0, 0, 1)'
  },
  buttonTitleSorting: {
    backgroundColor: "#fff",
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    boxShadow: '2 2 0 rgba(0, 0, 0, 1)'
  },
  selectTabContainer: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    backgroundColor: "#fff",
    boxShadow: '2 2 0 rgba(0, 0, 0, 1)'
  }
});

export default styles;