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
}

function handlerLogin(event){
    //event.preventDefault();  왜 작동이 안될까..

    const loginModal = document.querySelector(".login-modal");
    loginModal.classList.add("hidden");    
    const userId = document.querySelector("#username");
    localStorage.setItem("username", userId.value);
    showUser(userId.value);
    
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

// Weather
const API_KEY = "21e7354e03cfb05c15c5ad310b03b8ab";
function myGeo(position){
    console.log(position);
   const lat = position.coords.latitude;
   const lon = position.coords.longitude;
   console.log(lat, lon);

   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
   fetch(url).then(response => response.json().then(data=>{
       console.log(data);
       document.querySelector(".city-name").innerText = 
       `${data.name} ${data.sys.country}`;
       document.querySelector(".city-weather").innerText = 
       `${data.weather[0].main} / Clouds : ${data.clouds.all}% / ${data.main.temp}C`;
   }));
}
function myGeoErr(){
    alert("We  can`t find your place.")
}
navigator.geolocation.getCurrentPosition(myGeo, myGeoErr);