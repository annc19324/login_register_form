import React from 'react';
import { Button, Text, View } from 'react-native';
export default function HomeScreen({ navigation }) {
    return (
        <View >
            <Text>Hello Awesome Scene!</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}