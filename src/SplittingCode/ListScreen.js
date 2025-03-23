import React, { Component } from 'react';
import { TouchableHighlight, Text, View, StyleSheet } from 'react-native';

class ListScreen extends Component {
    render() {
        return (
            <View style={{ padding: 100 }}>
                <Text style={{ fontSize: 30 }}>List Screen</Text>
                <TouchableHighlight
                    onPress={() => this.props.navigation.push('Detail', { movieName: ['Frozen', 'Frozen2', 'Frozen3'] })}>
                    <Text style={{ fontSize: 30, padding: 10, borderWidth: 1 }}>
                        Go to Detail Screen
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

export default ListScreen;
