import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContactView from "./src/views/ContactView";
import ContactDetailView from "./src/views/ContactDetailView";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="ContactList"
				screenOptions={{
					headerStyle: { backgroundColor: "#1a1a1a" },
					headerTintColor: "#fff",
				}}
			>
				{/* Disable default header for ContactList */}
				<Stack.Screen
					name="ContactList"
					component={ContactView}
					options={{ headerShown: false }} // Disable header
				/>
				{/* Keep default header for ContactDetailView */}
				<Stack.Screen name="ContactDetailView" component={ContactDetailView} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
