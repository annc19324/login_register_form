import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";

const BMIScreen = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        const weightInKg = parseFloat(weight);
        const heightInMeters = parseFloat(height) / 100;

        if (!weightInKg || !heightInMeters) {
            alert('Please enter valid values');
            return;
        }

        const bmiValue = weightInKg / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(3));
        setCategory(getBMICategory(bmiValue));
    };

    const getBMICategory = (bmi) => {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 24.9) return 'Normal weight';
        if (bmi < 29.9) return 'Overweight';
        return 'Obese';
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BMI Calculator</Text>
            <View style={styles.inputContainer}>
                <Text>Weight (KG):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={weight}
                    onChangeText={setWeight}
                // onChangeText={(value) => {
                //     const obj = { ...this.state };
                //     obj.weight = value;
                //     this.setState(obj)
                // }}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text>Height (CM):</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={height}
                    onChangeText={setHeight}
                // onChangeText={(value) => this.setState(value)}
                />
            </View>

            {/* {bmi && ( */}
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>BMI: {bmi}</Text>
                <Text style={styles.resultText}>Category: {category}</Text>
            </View>
            {/* )} */}

            <TouchableOpacity style={styles.button} onPress={calculateBMI}>
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>


        </View>
    );
};

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
