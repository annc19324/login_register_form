import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

class BMIScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: '',
            height: '',
            bmi: null,
            category: ''
        };
    }

    // 🎯 `componentDidMount` - Chạy khi component được render lần đầu
    componentDidMount() {
        console.log("BMIScreen Mounted!");
    }

    // 🎯 `componentDidUpdate` - Chạy khi state thay đổi
    componentDidUpdate(prevProps, prevState) {
        if (prevState.weight !== this.state.weight || prevState.height !== this.state.height) {
            console.log("Weight or Height Updated:", this.state);
        }
    }

    calculateBMI = () => {
        const weightInKg = parseFloat(this.state.weight);
        const heightInMeters = parseFloat(this.state.height) / 100;

        if (!weightInKg || !heightInMeters) {
            alert('Please enter valid values');
            return;
        }

        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        this.setState({
            bmi: bmiValue.toFixed(2),
            category: this.getBMICategory(bmiValue)
        });
    };

    getBMICategory = (bmi) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 24.9) return 'Normal weight';
        if (bmi < 29.9) return 'Overweight';
        return 'Obese';
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>BMI Calculator</Text>

                <View style={styles.inputContainer}>
                    <Text>Weight (KG):</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={this.state.weight}
                        onChangeText={(value) => {
                            this.setState({ weight: value });
                        }}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text>Height (CM):</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        value={this.state.height}
                        onChangeText={(value) => {
                            this.setState({ height: value });
                        }}
                    />
                </View>

                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>BMI: {this.state.bmi}</Text>
                    <Text style={styles.resultText}>Category: {this.state.category}</Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.calculateBMI}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    inputContainer: {
        width: '80%',
        marginBottom: 15
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 5,
        borderRadius: 5
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    resultContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    resultText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default BMIScreen;
