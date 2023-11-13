var price = 0;
var selectedButtonIds = [];

function changeColor(selectedButton) {
    // 선택한 버튼 요소를 가져옵니다.
    var selectedButtonElement = document.getElementById(selectedButton);
    var priceElement = document.getElementById("price");

    var style = window.getComputedStyle(selectedButtonElement);
    // 선택한 버튼의 현재 배경색을 확인합니다.
    var backgroundColor = style.getPropertyValue("background-color");
    // 현재 색이 파란색인 경우 하얀색으로 변경하고, 하얀색인 경우 파란색으로 변경합니다.
    if (backgroundColor === "rgb(196, 196, 196)") {
        selectedButtonElement.style.backgroundColor = "rgb(68, 41, 245)";
        price += 15000;
        selectedButtonIds.push(selectedButton); // 선택한 버튼의 ID를 배열에 추가합니다.
        console.log(price);

    } else if (backgroundColor === "rgb(68, 41, 245)") {
        selectedButtonElement.style.backgroundColor = "rgb(196, 196, 196)";
        if (price >= 15000) {
            price -= 15000;
            const index = selectedButtonIds.indexOf(selectedButton);
            if (index !== -1) {
                selectedButtonIds.splice(index, 1);
            }
        }
    }
    priceElement.textContent = price + " 원";
    var seatElement = document.getElementById("seat");
    seatElement.textContent = formatSeatIds(selectedButtonIds);
}

function formatSeatIds(ids) {
    var result = '';
    if (ids.length <= 7) {
        result = ids.join(', ');
    } else {
        var remainingCount = ids.length - 7;
        result = ids.slice(0, 7).join(', ') + ' + ' + remainingCount + "개";
    }
    return result;
}

function reset() {
    var buttons = document.getElementsByTagName("button");
    var priceElement = document.getElementById("price");
    for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        var computedStyle = window.getComputedStyle(button);
        var backgroundColor = computedStyle.getPropertyValue("background-color");

        if (backgroundColor === "rgb(68, 41, 245)") {
            console.log(backgroundColor);
            button.style.backgroundColor = "rgb(196, 196, 196)";
        }
    }
    price = 0;
    selectedButtonIds = []; // 리셋할 때 선택한 좌석 초기화
    priceElement.textContent = price + " 원";
    var seatElement = document.getElementById("seat");
    seatElement.textContent = "";

}

function reservation() {

    if (selectedButtonIds.length === 0) {
        alert("좌석을 선택해주세요!");
        return; // 전송하지 않고 함수 종료
    }


    alert("예매가 완료되었습니다.");
    // 1. 서버를 사용 안한다면 이 코드 활성화
    // var arrayAsString = JSON.stringify(selectedButtonIds);
    // window.location.href = "mypage.html?data=" + encodeURIComponent(arrayAsString);
    // 1.

    // 2. 서버를 사용한다면 이 코드 활성화
    document.cookie = "dataArray=" + encodeURIComponent(JSON.stringify(selectedButtonIds));
    window.location.href = "mypage.html";
    // 2.
}

