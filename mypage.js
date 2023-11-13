document.addEventListener("DOMContentLoaded", function () {

    // 1. 서버를 사용 안한다면 이 코드 활성화
    // var urlParams = new URLSearchParams(window.location.search);
    // var dataArrayString = urlParams.get('data');
    // var dataArray = JSON.parse(decodeURIComponent(dataArrayString));
    // 1.

    // 2. 서버를 사용 한다면 이 코드 활성화
    var cookies = document.cookie.split(';');
    var dataArrayString = cookies.find(cookie => cookie.trim().startsWith('dataArray='));
    var dataArray = JSON.parse(decodeURIComponent(dataArrayString.split('=')[1]));
    // 2.

    var subSeatDetailElements = document.getElementsByClassName("sub_seat_detail");

    var seatElement = document.getElementById("sub_seat_detail");
    seatElement.textContent = formatSeatIds(dataArray);
});

function formatSeatIds(ids) {
    var result = '';
    if (ids.length <= 17) {
        result = ids.join(', ');
    } else {
        var remainingCount = ids.length - 17;
        result = ids.slice(0, 17).join(', ') + ' + ' + remainingCount + "개";
    }
    return result;
}
