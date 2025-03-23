import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LottieAnimation from './LottieAnimation'; // Import component LottieAnimation
import { search } from '../../api';  // Import hàm search từ api.js

const ListScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);  // Dữ liệu phim
    const [isLoading, setIsLoading] = useState(true);  // Trạng thái tải

    // // Lấy danh sách phim khi màn hình được tải
    // useEffect(() => {
    //     search('Dragon Ball')  // Thực hiện tìm kiếm phim
    //         .then((movies) => {
    //             setMovies(movies);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setIsLoading(false);
    //         });
    // }, []);  // Chạy chỉ một lần khi component mount

    // Lấy danh sách phim khi màn hình được tải
    useEffect(() => {
        const startTime = Date.now(); // Lấy thời gian bắt đầu

        // Hàm fetch dữ liệu
        const fetchData = async () => {
            try {
                const movies = await search('Dragon Ball');  // Thực hiện tìm kiếm phim
                setMovies(movies);

                // Tính thời gian đã trôi qua
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(3000 - elapsedTime, 0); // Đảm bảo ít nhất 5 giây

                // Đợi thêm thời gian còn lại (nếu có)
                setTimeout(() => {
                    setIsLoading(false);
                }, remainingTime);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);  // Chạy chỉ một lần khi component mount

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

    return (
        <FlatList
            data={movies}  // Dữ liệu là danh sách các bộ phim
            keyExtractor={(item) => item.imdbID}  // Sử dụng imdbID làm key cho mỗi item
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.push('Detail', { imdbID: item.imdbID })} // Chuyển imdbID vào màn hình chi tiết
                >
                    <View style={styles.row}>
                        <View style={{ flex: 3 }}>
                            <Image
                                style={styles.image}
                                source={item.Poster ? { uri: item.Poster } : require('../../assets/default-poster.png')}  // Nếu không có ảnh, sử dụng ảnh mặc định
                            />
                        </View>
                        <View style={{ flex: 10, padding: 10 }}>
                            <Text style={styles.title}>{item.Title} ({item.Year})</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 65,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        height: 100,
    },
    image: {
        height: 100,
        resizeMode: 'cover',
        borderWidth: 0.5,
        borderColor: 'darkgray',
        borderRadius: 2,
    },
    title: {
        fontSize: 20,
    },
    separator: {
        height: 1,
        backgroundColor: 'lightgray',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingAnimation: {
        width: 300,
        height: 300,
    },
});

export default ListScreen;