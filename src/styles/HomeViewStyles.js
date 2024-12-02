import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A", // Dark background
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Spaced grid layout
    paddingBottom: 80, // Leave space for the floating button
  },
  searchBar: {
    backgroundColor: "#333333",
    borderRadius: 24,
    padding: 12,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: "#CCCCCC",
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#D84343",
    borderRadius: 24,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonIcon: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
});
