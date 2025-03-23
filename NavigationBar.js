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
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

// Tạo ứng dụng với Stack Navigator
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="First"
                screenOptions={{
                    headerStyle: { backgroundColor: 'gray' },  // Thay đổi màu nền thanh điều hướng
                    headerTitleStyle: { color: 'white' },  // Định dạng màu tiêu đề
                    headerLeft: () => <Button title="Cancel" onPress={() => alert('Cancel Pressed')} />,  // Nút trái
                    headerRight: () => <Button title="Done" onPress={() => alert('Done Pressed')} />,  // Nút phải
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
});
