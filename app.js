//Clock
const clock1 = document.querySelector(".clock1");
const clock2 = document.querySelector(".clock2");

function nowTime(){
    const date = new Date();
    const year = date.getFullYear(); 
    const month = String(date.getMonth()+1).padStart(2, "0"); //0~11
    const day1 = String(date.getDate()).padStart(2,"0"); //일자
    let day2 = String(date.getDay()); //요일 0-sun 1-mon .. 6-sat
    const hours = String(date.getHours()).padStart(2,"0"); //0~23
    const min = String(date.getMinutes()).padStart(2,"0");

    if(day2==='0'){
        day2 = "s".toUpperCase()+"un";
    }else if(day2==='1'){
        day2 = "m".toUpperCase()+"on";
    }else if(day2==='2'){
        day2 = "t".toUpperCase()+"ue";
    }else if(day2==='3'){
        day2 = "w".toUpperCase()+"ed";
    }else if(day2==='4'){
        day2 = "t".toUpperCase()+"hu";
    }else if(day2==='5'){
        day2 = "f".toUpperCase()+"ri";
    }else{
        day2 = "s".toUpperCase()+"at";
    }
        
    clock1.innerText = `${hours}:${min}`;
    clock2.innerText = `${year}.${month}.${day1} ${day2}`;
}
nowTime();
setInterval(nowTime, 100);

//Background
const backBtn = document.querySelector(".change-background__btn");

function handlerNewBackground(){
    const backImg = [
        "gunslinger.jpg",
        "holynight.jpg",
        "papunika.jpg",
        "paython.jpg",
        "reaper.jpg",
        "shusyer.jpg",
        "southberun.jpg",
        "yorn.jpg"
    ]//8개
    const randomNum = Math.floor(Math.random()*backImg.length);
    document.body.style.backgroundImage = `url(background/${backImg[randomNum]})`;
}
backBtn.addEventListener("click", handlerNewBackground);


//Log in
const signInBtn = document.querySelector(".sign-in__btn");
const username = document.querySelector("#login-user");

function handlerSignin(){
    const loginModal = document.querySelector(".login-modal");
    loginModal.classList.remove("hidden");
}

function showUser(savedUsername){
    signInBtn.classList.add("hidden");
    document.querySelector(".greeting").classList.remove("hidden");    
    username.classList.remove("hidden");
    username.innerText = savedUsername;
    document.querySelector(".logout").classList.remove("hidden");
}

function handlerLogin(event){
    //event.preventDefault();  왜 작동이 안될까..

    const password = document.querySelector("#password");
    if(password.value !== ""){
        const loginModal = document.querySelector(".login-modal");
        loginModal.classList.add("hidden");    
        const userId = document.querySelector("#username");
        localStorage.setItem("username", userId.value);
        showUser(userId.value);
        userId.value=""
        password.value=""
    }else{
        alert("Plz write your Password!!");
    }
}

function handlerLoginClose(){
    document.querySelector(".login-modal").classList.add("hidden");
}

const logInBtn = document.querySelector(".login__btn");
const savedUsername = localStorage.getItem("username");

if(savedUsername === null){
    signInBtn.addEventListener("click", handlerSignin);
    logInBtn.addEventListener("click", handlerLogin);
    //button은 되는데 submit은 왜 안될까?    
}
else{
    showUser(savedUsername);
}

document.querySelector(".login-close").addEventListener("click", handlerLoginClose)

//Log out
function handlerLogout(){
    
    document.querySelector(".greeting").classList.add("hidden");
    document.querySelector(".logout").classList.add("hidden");
    document.querySelector("#login-user").classList.add("hidden");
    document.querySelector(".sign-in__btn").classList.remove("hidden");
    localStorage.removeItem("username");
}
document.querySelector(".logout").addEventListener("click", handlerLogout);


// Weather
const API_KEY = "21e7354e03cfb05c15c5ad310b03b8ab";
function myGeo(position){
   const lat = position.coords.latitude;
   const lon = position.coords.longitude;

   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
   fetch(url).then(response => response.json().then(data=>{
       document.querySelector(".city-name").innerText = 
       `${data.name} ${data.sys.country}`;

        const weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
       

       document.querySelector(".city-weather").innerHTML = 
       `${data.weather[0].main} <img src="${weatherIcon}" class="weather-icon"> /  <i class="fas fa-temperature-high"></i> ${data.main.temp}`;
   }));
}
function myGeoErr(){
    alert("We  can`t find your place.")
}
navigator.geolocation.getCurrentPosition(myGeo, myGeoErr);

//Todo
function handlerHideTodo(){
    document.querySelector(".todo-connect").style.visibility = "hidden";
}
function handlerShowTodo(){
    document.querySelector(".todo-connect").style.visibility = "visible";
}
document.querySelector(".todo").addEventListener("mouseover", handlerHideTodo);
document.querySelector(".todo").addEventListener("mouseout", handlerShowTodo);

const newInput = document.querySelector(".todo-input");
const newSubmit = document.querySelector(".todo-btn");

let toDos = [];

function handlerNewTodo(){

    if(newInput.value !== ""){
        const newObj = {
            value:newInput.value,
            ID:Date.now()
        };
        toDos.push(newObj);
        saveTodo();
        newInput.value = "";
        showTodo(newObj);
    }
    else{
        alert("I told you, Write!!!")
    }
}

function saveTodo(){
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function showTodo(newObj){
    const ul = document.querySelector(".todo-lists");
    const li = document.createElement("li");
    li.innerText = newObj.value;
    li.id = newObj.ID;
    const btn = document.createElement("button");
    btn.innerText =  "❌";
    li.appendChild(btn);
    ul.appendChild(li);
    btn.addEventListener("click", deleteTodo);
}

function deleteTodo(event){
    const li2 = event.target.parentElement;
    li2.remove();
    toDos = toDos.filter((toDo) => toDo.ID !== parseInt(li2.id));
    saveTodo();
}

const localTodos = localStorage.getItem("todos");
if(localTodos !== null){
    const parsedTodos = JSON.parse(localTodos);
    toDos = parsedTodos;
    parsedTodos.forEach(showTodo);
}
    newSubmit.addEventListener("click", handlerNewTodo);
