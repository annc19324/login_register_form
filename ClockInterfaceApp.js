import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ClockScreen from "./src/ClockInterfaceComponents/ClockScreen";
import AlarmScreen from "./src/ClockInterfaceComponents/AlarmSreen";
import StopwatchScreen from "./src/ClockInterfaceComponents/StopwatchScreen";
import TimerScreen from "./src/ClockInterfaceComponents/TimerScreen";

const TopTab = createMaterialTopTabNavigator();
const ClockInterfaceApp = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1, marginTop: 20 }}>
            <NavigationContainer>
                <TopTab.Navigator>
                    <TopTab.Screen name="Clock" component={ClockScreen} />
                    <TopTab.Screen name="Alarm" component={AlarmScreen} />
                    <TopTab.Screen name="Stopwatch" component={StopwatchScreen} />
                    <TopTab.Screen name="Timer" component={TimerScreen} />
                </TopTab.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
};

export default ClockInterfaceApp;