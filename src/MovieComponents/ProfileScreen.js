import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import LottieAnimation from './LottieAnimation';
import { view } from '../../api';
import PropTypes from 'prop-types';

const DetailScreen = ({ route }) => {
    const { imdbID } = route.params;
    const [movieDetails, setMovieDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     view(imdbID)
    //         .then((data) => {
    //             setMovieDetails(data);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setError('Failed to load movie details.');
    //             setIsLoading(false);
    //         });
    // }, [imdbID]);


    useEffect(() => {
        const startTime = Date.now(); // Lấy thời gian bắt đầu

        // Hàm fetch dữ liệu
        const fetchData = async () => {
            try {
                const data = await view(imdbID);  // Fetch chi tiết phim
                setMovieDetails(data);

                // Tính thời gian đã trôi qua
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(3000 - elapsedTime, 0); // Đảm bảo ít nhất 3 giây

                // Đợi thêm thời gian còn lại (nếu có)
                setTimeout(() => {
                    setIsLoading(false);
                }, remainingTime);
            } catch (error) {
                console.error(error);
                setError('Failed to load movie details.');
                setIsLoading(false);
            }
        };

        fetchData();
    }, [imdbID]);


    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <LottieAnimation
                    source={require('../../assets/loading-animation.json')}
                    style={styles.loadingAnimation}
                />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                style={styles.image}
                source={movieDetails.Poster ? { uri: movieDetails.Poster } : require('../../assets/default-poster.png')}
                accessibilityLabel={movieDetails.Title}
            />
            <Text style={styles.title}>{movieDetails.Title} ({movieDetails.Year})</Text>
            <Text style={styles.subTitle}>Meta: {movieDetails.Metascore} | IMDB: {movieDetails.imdbRating}</Text>
            <Text style={styles.subTitle}>Genre: {movieDetails.Genre}</Text>
            <Text style={styles.text}>Plot: {movieDetails.Plot}</Text>
            <Text style={styles.text}>Director: {movieDetails.Director}</Text>
            <Text style={styles.text}>Actors: {movieDetails.Actors}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingAnimation: {
        width: 300,
        height: 300,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    container: {
        padding: 20,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
    },
    subTitle: {
        fontSize: 20,
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginTop: 10,
    },
});

DetailScreen.propTypes = {
    route: PropTypes.shape({
        params: PropTypes.shape({
            imdbID: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default DetailScreen;