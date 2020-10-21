const toDoForm =document.querySelector(".js-toDoForm"),
    toDoInput =toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

    
const TODOS_LS = "toDos";
// 해야할 일을 생성할때마다 toDos라는 array에 추가하도록 함 
let toDos =[];

function deleteToDo(event) {
    const btn =event.target;
    const li= btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos =toDos.filter(function(toDo){
        return toDo.id !==parseInt(li.id) ;
    });
    toDos =cleanToDos ;
    saveToDos();
}
/*local storage에는 javascript의 data를 저장할수 없으므로 string만 저장가능 
    JSON.stringify함수는 object를 string으로 바꿔주는 함수임*/
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    /* 원하는 element를 만들어준다 */
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span =document.createElement("span");
    const newId =toDos.length + 1 ;
    delBtn.innerText ="❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    /* father element안에 넣는 작업 */
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId;
    toDoList.appendChild(li);

    const toDoObj ={
        text : text,
        id : newId 
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue =toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value= "";
}

/*data 를 전달할때 javascript가 그걸 다룰수 있도록 object로 다시 바꿔줘야함 
    toDos를 가져온 뒤 parsedTodos로 object로 변환하고 
    각각에 대해서 paintToDo라는 function을 실행*/
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
      const parsedToDos =JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo){
          paintToDo(toDo.text);
      });
        
    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}    

init();