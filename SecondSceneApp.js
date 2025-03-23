import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Tạo Stack Navigator
const Stack = createStackNavigator();

// Màn hình First Scene
function FirstScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Hello First Scene!</Text>
            <Button
                title="Go to Second Scene"
                onPress={() => navigation.navigate('Second')}
            />
            <Button
                title="Check Current Routes"
                onPress={() => {
                    const state = navigation.getState();
                    console.log(state.routes);  // In ra các route hiện tại trong stack
                }}
            />
        </View>
    );
}

// Màn hình Second Scene
function SecondScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Hello Second Scene!</Text>
            <Button
                title="Go back to First Scene"
                onPress={() => navigation.pop()}
            />
            <Button
                title="Check Current Routes"
                onPress={() => {
                    const state = navigation.getState();
                    console.log(state.routes);  // In ra các route hiện tại trong stack
                }}
            />
        </View>
    );
}

// Tạo ứng dụng với Stack Navigator
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="First">
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
});
