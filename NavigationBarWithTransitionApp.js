import React from 'react';
import { Button, Text, View, StyleSheet, TouchableHighlight, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

// Create Stack Navigator
const Stack = createStackNavigator();

// Screen for First Scene
function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello First Scene!</Text>
      <Button
        title="Go to Second Scene"
        onPress={() => navigation.navigate('Second')}
      />
    </View>
  );
}

// Screen for Second Scene
function SecondScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello Second Scene!</Text>
      <Button
        title="Go back to First Scene"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

// Application with Stack Navigator
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"  // Dark status bar text for light background
        backgroundColor="darkred" // Status bar background color
      />
      <Stack.Navigator
        initialRouteName="First"
        screenOptions={{
          headerStyle: { backgroundColor: 'darkred' },  // Header background color
          headerTitleStyle: { color: 'white', fontSize: 20 },  // Title color and font size
          headerLeft: () => (
            <TouchableHighlight onPress={() => alert('Cancel Pressed')}>
              <Text style={styles.navigationBarText}>Cancel</Text>
            </TouchableHighlight>
          ),  // Left button (Cancel)
          headerRight: () => (
            <TouchableHighlight onPress={() => alert('Done Pressed')}>
              <Text style={styles.navigationBarText}>Done</Text>
            </TouchableHighlight>
          ),  // Right button (Done)
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // Slide transition from left to right (iOS default)
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 500 }, // Animation duration when screen is opening
            },
            close: {
              animation: 'timing',
              config: { duration: 500 }, // Animation duration when screen is closing
            },
          },
        }}
      >
        <Stack.Screen name="First" component={FirstScreen} />
        <Stack.Screen name="Second" component={SecondScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navigationBarText: {
    color: 'white',
    padding: 10,
    fontSize: 15,
  },
});
