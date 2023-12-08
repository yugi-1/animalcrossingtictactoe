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

    let pVal = poinp.value;
  
    
    fetch("/api/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            name: pVal
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
}

ptis.onclick = function() {
    ptinp.style.display = 'none';
    ptis.style.display = 'none';
    let pValtwo = ptinp.value;

    fetch("/api/players", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            nameTwo: pValtwo
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
            
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
        }
    })
        .then(res => res.json())
        .then(villagers => populateVillager(villagers));  
};

let preSpriteSelector = document.getElementById('villagepp');
let uiSelectOne = document.getElementById('villageSelectUIO');

function populateVillager(villagers) {
      //display villagers
            let chooseBtnOne = document.getElementById('createPOC');
            let previewSprite = document.createElement('img');
            let uiPreview = document.getElementById('villageP');
            let infoCreate = document.createElement('p');
            infoCreate.setAttribute('class', 'characterName');
            previewSprite.setAttribute('class', 'preSprite');

            for (let villager of villagers) {
                //name display
                let imgCreate = document.createElement('img');
                imgCreate.setAttribute('class', 'imgclass');
                imgCreate.setAttribute('id', villager.id);
                imgCreate.src=villager.image_url;
                uiSelectOne.appendChild(imgCreate);

                imgCreate.addEventListener('click', () => {
                    infoCreate.style.display = 'block';
                    infoCreate.innerText = villager.name;
                    uiPreview.appendChild(infoCreate);
    //villager big image
                    previewSprite.style.display = 'block';
                    previewSprite.setAttribute('id', villager.id);
                    previewSprite.src=villager.image_url;
                    preSpriteSelector.appendChild(previewSprite);
                    chooseBtnOne.style.display = 'block';
                });  
            };
}
//game setup screen
let createPOCBt = document.getElementById('createPOC');
let createPTCBt = document.getElementById('createPTC');

// createPOCBt.innerText = `Choose Character ${pVal}`;

// function addUserOne() {
//     fetch("/api/players", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify({
//             name: pVal,
//             // character: inputValTwo
//         })
//     })
//         .then((res) => res.json())
//         .then((data) => console.log(data));
// }