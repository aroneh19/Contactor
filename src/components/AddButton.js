import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "../styles/HomeViewStyles";

export default function AddButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonIcon}>+</Text>
    </TouchableOpacity>
  );
}
