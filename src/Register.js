import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';

export default function RegisterScreen() {
    const [rememberMe, setRememberMe] = useState(false);
    const [secureText, setSecureText] = useState(true);

    const toggleSwitch = () => setRememberMe(previousState => !previousState);
    const togglePasswordVisibility = () => setSecureText(!secureText);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/arrow.png')}
                    style={styles.backIcon}
                />
                <Text style={styles.title}>Sign Up</Text>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Welcome Text */}
                <Text style={styles.welcomeText}>Create Account</Text>

                {/* Subtitle */}
                <Text style={styles.subtitle}>Enter your Name, Email and password for sign up. Already have account?</Text>

                {/* Username Input */}
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/user.png')}
                        style={styles.inputIcon}
                    />
                    <TextInput style={styles.input} placeholder="Username" />
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/email.png')}
                        style={styles.inputIcon}
                    />
                    <TextInput style={styles.input} placeholder="Email address" />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                    <Image
                        source={require('../assets/password.png')}
                        style={styles.inputIcon}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={secureText}
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Image
                            source={secureText ? require('../assets/eye.png') : require('../assets/no_eye.png')}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                </View>

                {/* Remember Me and Forgot Password */}
                <View style={styles.rememberContainer}>
                    <View style={styles.rememberMe}>
                        <Switch onValueChange={toggleSwitch} value={rememberMe} />
                        <Text>Remember Me</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign Up button */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>

                {/* OR section */}
                <Text style={styles.orText}>OR</Text>

                {/* Social buttons */}
                <TouchableOpacity style={styles.socialButtonFacebook}>
                    <View style={styles.iconContainerFacebook}>
                        <Image
                            source={require('../assets/fb.png')}
                            style={styles.socialIcon}
                        />
                    </View>
                    <Text style={styles.socialButtonText}>Connect With Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButtonGoogle}>
                    <View style={styles.iconContainerGoogle}>
                        <Image
                            source={require('../assets/gg.png')}
                            style={styles.socialIcon}
                        />
                    </View>
                    <Text style={styles.socialButtonText}>Connect With Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 40,
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 1
    },
    backIcon: {
        width: 18,
        height: 18,
        position: 'absolute',
        left: 20
    },
    title: {
        fontSize: 28,
        fontWeight: '450',
        marginTop: 8,
        marginBottom: 10,
        textAlign: 'center'
    },
    mainContent: {
        marginTop: 130,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    welcomeText: {
        fontSize: 25,
        fontWeight: '450',
        marginBottom: 20,
        textAlign: 'left',
        width: '100%'
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 20,
        textAlign: 'left',
        width: '100%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EFEFF3',
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        backgroundColor: 'F8F8F8'
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    input: {
        flex: 1,
        height: 40,
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    forgotPassword: {
        color: '#077F7B',
        position: 'absolute',
        right: 0,
        height: '100%',
        top: 15
    },
    button: {
        backgroundColor: '#008080',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        marginBottom: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '0'
    },
    signupLink: {
        color: '#077F7B'
    },
    orText: {
        textAlign: 'center',
        marginVertical: 10,
        marginBottom: 10,
    },
    socialButtonFacebook: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4A61A8',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    socialButtonGoogle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#53A0F4',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
    },
    socialButtonText: {
        color: 'white',
        marginLeft: 10,
    },
    iconContainerFacebook: {
        backgroundColor: 'white',
        paddingRight: 11,
        paddingTop: 5,
        paddingLeft: 12,
        paddingBottom: 5,
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 20,
    },
    iconContainerGoogle: {
        backgroundColor: 'white',
        paddingRight: 8,
        paddingTop: 5,
        paddingLeft: 9,
        paddingBottom: 5,
        borderRadius: 5,
        marginRight: 10,
        marginLeft: 20,
    },
    socialIcon: {
        width: 20,
        height: 20,
    }
});