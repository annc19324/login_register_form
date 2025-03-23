import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClockScreen from './src/components/ClockScreen';
import AlarmScreen from './src/components/AlarmScreen';
import StopwatchScreen from './src/components/StopwatchScreen';
import TimerScreen from './src/components/TimerScreen';

const TopTab = createMaterialTopTabNavigator();

export default function ClockApp() {
    return (
        <NavigationContainer>
            <TopTab.Navigator
                initialRouteName="Clock"
                tabBarPosition="top"
                screenOptions={{
                    swipeEnabled: true,
                    tabBarActiveTintColor: '#FF4081',
                    tabBarInactiveTintColor: '#999999',
                    tabBarIndicatorStyle: {
                        backgroundColor: '#FF4081',
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                    },
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF', // Màu nền của thanh tab
                    },
                }}
            >
                <TopTab.Screen name="Clock" component={ClockScreen} />
                <TopTab.Screen name="Alarm" component={AlarmScreen} />
                <TopTab.Screen name="Stopwatch" component={StopwatchScreen} />
                <TopTab.Screen name="Timer" component={TimerScreen} />
            </TopTab.Navigator>
        </NavigationContainer>
    );
}