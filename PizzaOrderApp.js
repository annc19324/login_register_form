import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoresScreen from './src/PizzaOrderComponents/StoresScreen';
import OrderScreen from './src/PizzaOrderComponents/OrderScreen';
import BasketScreen from './src/PizzaOrderComponents/BasketScreen';
import AccountScreen from './src/PizzaOrderComponents/AccountScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const PizzaOrderApp = () => (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Menu') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Order') {
                        iconName = focused ? 'pizza' : 'pizza-outline'; // Adjusted for Order screen
                    } else if (route.name === 'Basket') {
                        iconName = focused ? 'basket' : 'basket-outline';
                    } else if (route.name === 'Account') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Menu" component={StoresScreen} />
            <Tab.Screen name="Order" component={OrderScreen} />
            <Tab.Screen name="Basket" component={BasketScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    </NavigationContainer>
);

export default PizzaOrderApp;