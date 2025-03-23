let rootURL = 'http://www.omdbapi.com/';

// Hàm tìm kiếm phim
exports.search = function (q) {
    let url = `${rootURL}?s=${q}&apikey=da029db7`;
    console.log(url);
    return fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
            return json.Search; // Trả về danh sách phim
        });
}

// Hàm lấy thông tin chi tiết của phim theo ID
exports.view = function (id) {
    let url = `${rootURL}?i=${id}&plot=short&r=json&apikey=da029db7`;
    return fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
            return json; // Trả về thông tin chi tiết của phim
        });
}
