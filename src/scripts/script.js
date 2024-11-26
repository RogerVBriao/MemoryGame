const emojis = [
    "🦁",
    "🦁",
    "🐷",
    "🐷",
    "🐮",
    "🐮",
    "🦝",
    "🦝",
    "🐵",
    "🐵",
    "🐸",
    "🐸",
    "🐴",
    "🐴",
    "🐰",
    "🐰",
];// biblioteca de emojis
const progressBar = document.getElementById("progress-bar");// barra de progresso
const duration = 30;// tempo de duração
let initialCards = null;
let timer = null;
let timeLeft = duration;// tempo restante
let contadorCards = 0; //contador de cartas
let started = false;

let openCards = [];//armazena os cards abertos
let shufleEmojis = emojis.sort(()=> Math.random() > 0.5 ? 2 : -1);// embaralha os emojis



for(let i = 0; i < emojis.length; i++){
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shufleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box);
}

function playSound(sound) {
    let audio = new Audio(`./src/audio/${sound}` );
        audio.volume = 0.4;
        audio.pause();
        audio.currentTime = 0;
        audio.play();
        
    }

function handleClick(){
    if(started){
        if(openCards.length < 2){
            playSound("flipCard.mp3")
            this.classList.add("boxOpen");
            openCards.push(this);
        }
        if(openCards.length == 2){
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        playSound("hit.m4a")
    }else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        playSound("error.mp3")
    }
    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length){
        clearInterval(timer);
        playSound("victory.mp3")
        alert("Parabéns, você ganhou!");
    } 
}

function updateProgressBar(){
    if(started){
        const progressPercentage = (timeLeft/duration) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        if(timeLeft <= 0){
            started = false;
            clearInterval(timer);
            playSound("gameOver.mp3")
            alert("Tempo esgotado, você perdeu!");
        }
        timeLeft--;
    }
}


function startGame(){
    
    timer = setInterval(updateProgressBar, 1000);
    progressBar.classList.add("progress-bar");
    initialCards = setInterval(openStart, 100);
    playSound("countDown.mp3")
    
}

function openStart(){
    const card = document.getElementsByClassName("item");
    let final = card.length +4;
    console.log("contador"+contadorCards+ "card.length" + card.length);

    //abre 4 e fecha 4, abre outros 4 e fecha outros 4;
    if(contadorCards <= 3) card[contadorCards].classList.add("boxOpen");
    if(contadorCards >= 4 && contadorCards < card.length) {
        card[contadorCards].classList.add("boxOpen"); 
        card[contadorCards-4].classList.remove("boxOpen");
    }
    if(contadorCards >= card.length && contadorCards < final){
        card[contadorCards-4].classList.remove("boxOpen");

    }
    if(contadorCards == final){
        console.log("Entrou no else de saida");
        clearInterval(initialCards);
        started =  true;
    }
    
    /*if(contadorCards <= final) card[contadorCards].classList.add("boxOpen");

    if(contadorCards >= 1 && contadorCards <= final){ 
        //alert("Entrou no if remove, contadorCards"+contadorCards);
        card[contadorCards-1].classList.remove("boxOpen");
    }
    if(contadorCards == final){
        console.log("Entrou no if de saida");
        card[final].classList.remove("boxOpen");
        clearInterval(initialCards);
        started =  true;
    }*/

    
    contadorCards++;
}