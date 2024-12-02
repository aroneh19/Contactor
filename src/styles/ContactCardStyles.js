import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    backgroundColor: "#D84343", // Red background for the card
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 8,
    width: "40%", // Adjust width for grid layout
    alignItems: "center", // Center the text and placeholder
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // White text
    marginTop: 10,
  },
  phone: {
    fontSize: 14,
    color: "#CCCCCC", // Gray text
    marginTop: 5,
  },
});
