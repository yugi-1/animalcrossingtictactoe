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
    fetch(`https://api.nookipedia.com/villagers?game=nl&game=cf&game=ww&game=hhd&game=dnm&game=ac&game=pc`, {
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
        .then(villagers => populateVillager(villagers));  
};



function populateVillager(villagers) {
      //display villagers
            let uiPreview = document.getElementById('villageP');
            let uiSelectOne = document.getElementById('villageSelectUIO');
            let infoCreate = document.createElement('p');
            infoCreate.setAttribute('class', 'test');
            for (let villager of villagers) {
                let imgCreate = document.createElement('img');
                imgCreate.setAttribute('class', 'imgclass');
                imgCreate.setAttribute('id', villager.id);
                imgCreate.src=villager.image_url;
                uiSelectOne.appendChild(imgCreate);
                
                imgCreate.addEventListener('click', () => {
                    infoCreate.style.display = 'block';
                    infoCreate.innerText = villager.name;
                    uiPreview.appendChild(infoCreate);
                });  
            };
}