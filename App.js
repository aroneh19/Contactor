import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainView from './src/views/MainView';
import ContactView from './src/views/ContactView';

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName="ContactList"
            screenOptions={{
              headerStyle: { backgroundColor: '#1a1a1a' },
              headerTintColor: '#fff',
            }}
        >
          <Stack.Screen name="ContactList" component={MainView}/>
          <Stack.Screen name="ContactView" component={ContactView}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
