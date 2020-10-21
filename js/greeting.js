const form =document.querySelector(".js-form"),
    input =form.querySelector("input"),
    greeting =document.querySelector(".js-greetings");

    const USER_LS = "currentUser",
        SHOWING_CN ="showing";
/* userName을 저장하는 방법 */
function saveName(text ){
    localStorage.setItem(USER_LS, text) ;
}
/* submit 버튼 클릭시 이벤트조작 */
function handleSubmit(event) {
    // event의 default 값을 막는다 
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit" , handleSubmit);
}


function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText =`Hello ${text}`;
}

    /*localStorage에서 userName 값 가져오기 */

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    }else {
        paintGreeting(currentUser);
    }
}


function init() {
    loadName();
}

init();