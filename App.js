import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeView from "./src/views/HomeView";
import DetailsView from "./src/views/DetailsView";
import EditView from "./src/views/EditView";
import "react-native-gesture-handler";
import "react-native-reanimated";

const Stack = createStackNavigator();

export default function App() {
  // State for managing contacts
  const [contacts, setContacts] = useState([
    { id: "1", name: "John Doe", phone: "123-456-7890", image: null },
    { id: "2", name: "Jane Smith", phone: "987-654-3210", image: null },
  ]);

  // Function to update a contact
  const updateContact = (id, updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? updatedContact : contact
      )
    );
  };

  // Function to add a new contact
  const addContact = (newContact) => {
    setContacts((prevContacts) => [
      ...prevContacts,
      { ...newContact, id: Date.now().toString() },
    ]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {/* Home Screen */}
        <Stack.Screen name="Home">
          {(props) => (
            <HomeView
              {...props}
              contacts={contacts}
              setContacts={setContacts}
            />
          )}
        </Stack.Screen>

        {/* Details Screen */}
        <Stack.Screen name="Details">
          {(props) => (
            <DetailsView
              {...props}
              contacts={contacts} // Pass contacts for reference in DetailsView
            />
          )}
        </Stack.Screen>

        {/* Edit/Add Screen */}
        <Stack.Screen name="Edit">
          {(props) => (
            <EditView
              {...props}
              contacts={contacts} // Optional: Pass contacts if needed for context
              updateContact={updateContact}
              addContact={addContact}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
