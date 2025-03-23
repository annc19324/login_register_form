import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

class DetailScreen extends Component {
    render() {
        const { movieName } = this.props.route.params;  // Nhận tham số từ ListScreen

        return (
            <View style={{ padding: 20, paddingTop: 100 }}>
                <Text style={{ fontSize: 30 }}>Detail Screen:</Text>
                {movieName.map((movie, index) => (
                    <Text key={index} style={{ fontSize: 20 }}>
                        {movie}
                    </Text>
                ))}
                {/* <Text>Movie Name: {movieName.join(', ')}</Text> */}
            </View>
        );
    }
}

export default DetailScreen;
