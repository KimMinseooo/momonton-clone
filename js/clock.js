const clockContainer =document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

    /*시간을 얻어오는 함수 */
function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText =`${hours < 10 ? `0{hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds }`;
    
}

function init () {
    getTime();
    setInterval(getTime, 1000);   /*1초마다 갱신 */

}

init();