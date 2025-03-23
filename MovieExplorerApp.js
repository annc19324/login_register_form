import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, TouchableOpacity } from 'react-native';
import ListScreen from './src/MovieComponents/HomeScreen';
import DetailScreen from './src/MovieComponents/ProfileScreen';

const Stack = createStackNavigator();

const ListViewApp = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="List"
                screenOptions={{
                    headerStyle: { backgroundColor: 'darkred' },
                    headerTitleAlign: 'center',  // Đặt title ở giữa
                    headerTintColor: 'white', // Màu chữ trên header
                }}
            >
                <Stack.Screen
                    name="List"
                    component={ListScreen}
                    options={{ headerTitle: 'Movie Explore' }}
                />
                <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={({ navigation }) => ({
                        headerTitle: 'Movie Detail',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: 'white', marginLeft: 10, fontSize: 18 }}>Back</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ListViewApp;
