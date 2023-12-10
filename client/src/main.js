//title screen
let gameScreen = document.getElementById('gameContent');
let title = document.getElementById('containerTitle');
title.onclick = function startGame() {
    title.setAttribute('class', 'title');
    gameScreen.style.display = 'block';
}

let edit = document.getElementById('EditBtn');

edit.onclick = function edit() {
    console.log('edt works');
    gameScreen.style.display = 'block';
}

//playerone input screen 
let poinp = document.getElementById('usernameInp');
let pois = document.getElementById('createPO');
let ptinp = document.getElementById('usernameInpT');
let ptis = document.getElementById('createPT');

let createPOCBt = document.getElementById('createPOC');
let createPTCBt = document.getElementById('createPTC');

pois.onclick = function() {
    poinp.style.display = 'none';
    pois.style.display = 'none';
    ptinp.style.display = 'block';
    ptis.style.display = 'block';

    let pVal = poinp.value;
    createPOCBt.innerText = `Choose your character, ${pVal}!`;
  
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
    createPTCBt.innerText = `Choose your character, ${pValtwo}!`;

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

let disUser = document.getElementById('mainUser');
let menuAppear = document.getElementById('gameMenu');
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
                    infoCreate.innerText = villager.name; //IMPORTANT
                    uiPreview.appendChild(infoCreate);
    
                    previewSprite.style.display = 'block';
                    previewSprite.setAttribute('id', villager.id); //IMPORTANT
                    previewSprite.src=villager.image_url;
                    preSpriteSelector.appendChild(previewSprite);
                    chooseBtnOne.style.display = 'block';

                    createPOCBt.onclick = function() {
                        createPOCBt.style.display = 'none';
                        createPTCBt.style.display = 'block';
                        //display playerone main sprite

                        let secondSprite = document.createElement('img');
                        secondSprite.setAttribute('class', 'spriteTwo');
                        secondSprite.style.display = 'block';
                        secondSprite.setAttribute('id', villager.id); //IMPORTANT
                        secondSprite.src=villager.image_url;
                        mainContain.appendChild(secondSprite);


                        fetch("/api/players", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json;charset=utf-8",
                            },
                            body: JSON.stringify({
                                characterOne: villager.id
                                })
                            })
                                .then((res) => res.json())
                                .then((data) => console.log(data));
                    };
                    //display first character on game
                    let mainContain = document.getElementById('mainGame');
                   
                    createPTCBt.onclick = function() {
                        createPTCBt.style.display = 'none';
                        createPOCBt.style.display = 'none';
                        uiSelectOne.style.display = 'none';
                        preSpriteSelector.style.display = 'none';

                        let firstSprite = document.createElement('img');
                        firstSprite.setAttribute('class', 'spriteOne');
                        firstSprite.style.display = 'block';
                        firstSprite.setAttribute('id', villager.id); //IMPORTANT
                        firstSprite.src=villager.image_url;
                        mainContain.appendChild(firstSprite);
                        //display main usernames
                        let pValtwo = ptinp.value;
                        let pVal = poinp.value;
                        
                        let thisUsername = document.createElement('h3');
                        thisUsername.setAttribute('class', 'mainUsernames');
                        thisUsername.innerText = pVal;
                        disUser.appendChild(thisUsername);

                        let thisUsernametwo = document.createElement('h3');
                        thisUsernametwo.setAttribute('class', 'mainUsernames');
                        thisUsernametwo.innerText = pValtwo;
                        disUser.appendChild(thisUsernametwo);
                
                        menuAppear.style.display = 'block';

                        fetch("/api/players", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json;charset=utf-8",
                            },
                            body: JSON.stringify({
                                characterTwo: villager.id
                                })
                            })
                                .then((res) => res.json())
                                .then((data) => console.log(data));
                    };
                });  
            };
}

let gameBoard = document.getElementById('theGame');
let play = document.getElementById('playBtn');
play.onclick = function tictactoe() {
    menuAppear.style.display = 'none';
    gameBoard.style.display = 'block';
}