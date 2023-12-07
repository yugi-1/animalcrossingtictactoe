//data object backend
let players = [];

//title screen
let gameScreen = document.getElementById('gameContent');
let title = document.getElementById('containerTitle');
title.onclick = function startGame() {
    title.setAttribute('class', 'title');
    gameScreen.style.display = 'block';
}

//playerone input screen 
let poinp = document.getElementById('usernameInp');
let pois = document.getElementById('createPO');
let ptinp = document.getElementById('usernameInpT');
let ptis = document.getElementById('createPT');

pois.onclick = function() {
    poinp.style.display = 'none';
    pois.style.display = 'none';
    ptinp.style.display = 'block';
    ptis.style.display = 'block';
      //insert backend code here to push usernames to data
}

ptis.onclick = function() {
    ptinp.style.display = 'none';
    ptis.style.display = 'none';
    fetchVillagers();
}


//fetch villagers data
function fetchVillagers() {
    fetch(`https://api.nookipedia.com/villagers?game=nl&game=cf&game=ww`, {
        method: "GET",
        headers: {
            "Accept-Version": '1.0.0',
            "X-API-KEY": '3802c382-5fbc-4915-96bb-7decc1d5b0cd',
            "Content-Type": "application/json;charset=utf-8"
        },
        // body: JSON.stringify({      
        // })
    })
        .then(res => res.json())
        .then(villagers => {  //display villager 

            let uiSelectOne = document.getElementById('villageSelectUIO');
            let tab = ``;
            
            for (let v of villagers) {
                tab += `<img class="imgclass" src="${v.image_url}">`;
            }
            uiSelectOne.innerHTML = tab;
            // let uiSelectOne = document.getElementById('villageSelectUIO');
            // uiSelectOne.innerHTML = `<img class="imgclass" src="${villagers[0].image_url}">`;
        });

      
        
}

