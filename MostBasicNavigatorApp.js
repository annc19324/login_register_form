import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/MostBasicNavigatorComponents/HomeScreen";
import DetailsScreen from "./src/MostBasicNavigatorComponents/DetailsScreen";

const Stack = createStackNavigator();

export default function MostBasicNavigatorApp() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );

}