import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import styles from "../styles/EditViewStyles";

export default function EditView({ route, navigation, updateContact, addContact }) {
  const { contact, mode } = route.params || {};
  const [name, setName] = useState(contact ? contact.name : "");
  const [phone, setPhone] = useState(contact ? contact.phone : "");

  const handleSave = () => {
    if (mode === "edit") {
      updateContact(contact.id, { ...contact, name, phone });
    } else {
      addContact({ name, phone });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
