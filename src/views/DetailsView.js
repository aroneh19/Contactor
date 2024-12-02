import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import styles from "../styles/DetailsViewStyles";

export default function DetailsView({ route, navigation }) {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.phone}>{contact.phone}</Text>
      <Button
        title="Edit Contact"
        onPress={() => navigation.navigate("Edit", { contact, mode: "edit" })}
      />
      <Button
        title="Call"
        onPress={() => {
          // Trigger phone call (native functionality needed)
          console.log(`Calling ${contact.phone}`);
        }}
      />
    </View>
  );
}
