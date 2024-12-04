import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContactView from "./src/views/ContactView";
import ContactDetailView from "./src/views/ContactDetailView";
import { ContactProvider } from "./src/Context/AppContext";


const Stack = createStackNavigator();

const App = () => {
	return (
		<ContactProvider>
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="ContactList"
				screenOptions={{
					headerStyle: { backgroundColor: "#1a1a1a" },
					headerTintColor: "#fff",
				}}>
				<Stack.Screen name="ContactList" component={ContactView} />
				<Stack.Screen name="ContactDetailView" component={ContactDetailView} />
			</Stack.Navigator>
		</NavigationContainer>
		</ContactProvider>
	);
};

export default App;
