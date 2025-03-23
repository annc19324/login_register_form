import React from 'react';
import { Platform } from 'react-native';

let LottieView;
if (Platform.OS === 'web') {
    LottieView = require('lottie-react').default; // Sử dụng lottie-react cho web
} else {
    LottieView = require('lottie-react-native').default; // Sử dụng lottie-react-native cho di động
}

const LottieAnimation = ({ source, ...props }) => {
    if (Platform.OS === 'web') {
        return <LottieView animationData={source} {...props} />; // Sử dụng animationData cho web
    }
    return <LottieView source={source} autoPlay loop {...props} />; // Sử dụng source cho di động
};

export default LottieAnimation;