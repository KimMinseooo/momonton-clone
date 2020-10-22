const toDoForm =document.querySelector(".js-toDoForm"),
    toDoInput =toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    clearCount =document.querySelector(".todo-success-count"),
    toDoWarning =document.querySelector(".warning");

    
const TODOS_LS = "toDos",
    CLEAR_LS ="clear";
// 해야할 일을 생성할때마다 toDos라는 array에 추가하도록 함 
let toDos =[];
const fullExclamation ="❗",
    emptyExclamation ="❕";
/* ToDo를 삭제할떄 */
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
/* ToDo를 했을때 */
function clearToDo(event){
    event.preventDefault();
    const btn =event.target;
    const li= btn.parentNode;
    const span =li.querySelector("span");
    span.classList.add("cleared");
    setTimeout(function(){
        clear =bringClear();
        localStorage.setItem(CLEAR_LS,parseInt(clear)+1);
        clearCount.innerText =parseInt(clearCount.innerText) +1;
        deleteToDo(event);
    },600);
}

function bringClear(){
    let clear =localStorage.getItem(CLEAR_LS);
    if(clear === null){
        clear =0;
    }
    return clear;
}

function switchExclamation(event){
    const btn =event.target;
    const li =btn.parentNode;
    if(btn.innerText === fullExclamation){
        btn.innerText =emptyExclamation;
        for(let i=0; i<toDos.length;i++){
            if(toDos[i].id ==li.id){
                toDos[i].isImportant = !(toDos[i].isImportant);
                break;
            }
        }
    }
    else{
        btn.innerText = fullExclamation;
        for(let i=0; i<toDos.length; i++){
            if(toDos[i].id ==li.id){
                toDos[i].isImportant = !(toDos[i].isImportant);
                break;
            }
        }
    }
    saveToDos();
}

/*local storage에는 javascript의 data를 저장할수 없으므로 string만 저장가능 
    JSON.stringify함수는 object를 string으로 바꿔주는 함수임*/
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text,newId,isImportant) {
    /* 원하는 element를 만들어준다 */
    const li = document.createElement("li");
    const importantBtn =document.createElement("button");
    const span =document.createElement("span");
    const btns =document.createElement("div");
    const clearBtn =document.createElement("button");
    const delBtn = document.createElement("button");
    if(isImportant === undefined){
        isImportant =false;
    }
    if( isImportant){
        importantBtn.innerText =fullExclamation;
    }else {
        importantBtn.innerText =emptyExclamation;
    }
    if(newId ===undefined){
        newId =toDos.length +1;
    }
    span.innerText = text;
    clearBtn.innerText ="✔";
    clearBtn.classList.add("clearBtn");
    clearBtn.classList.add("btn");
    delBtn.classList.add("delBtn");
    delBtn.classList.add("btn");
    importantBtn.classList.add("exclamationBtn");
    importantBtn.classList.add("btn");
    delBtn.innerText ="❌";
    clearBtn.addEventListener("click",clearToDo);
    delBtn.addEventListener("click", deleteToDo);
    importantBtn.addEventListener("click", switchExclamation);
    /* father element안에 넣는 작업 */
    li.id=newId;
    li.appendChild(importantBtn);
    li.appendChild(span);
    li.appendChild(clearBtn);
    li.appendChild(delBtn);
    toDoList.appendChild(li);

    const toDoObj ={
        text : text,
        id : newId ,
        isImportant :isImportant
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    if(toDos.length <11){
        const currentValue =toDoInput.value;
        if(currentValue !=""){
            paintToDo(currentValue);
            toDoInput.value= "";
        }
    }else{
        //toDo가 11개가 넘으면 경고창이 뜨게끔 설정
        toDoWarning.classList.add("showing");
        setTimeout(function(){
            toDoWarning.classList.remove("showing");
        },2000);
    }
}
/*data 를 전달할때 javascript가 그걸 다룰수 있도록 object로 다시 바꿔줘야함 
    toDos를 가져온 뒤 parsedTodos로 object로 변환하고 
    각각에 대해서 paintToDo라는 function을 실행*/
function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
      const parsedToDos =JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo){
          paintToDo(toDo.text, toDo.id, toDo.isImportant);
      });
        
    }
}


function init() {
    loadToDos();
    clearCount.innerText= bringClear();
    toDoForm.addEventListener("submit", handleSubmit);
}    

init();