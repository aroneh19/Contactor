import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import styles from "../styles/ContactCardStyles";

export default function ContactCard({ contact, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
    </TouchableOpacity>
  );
}
