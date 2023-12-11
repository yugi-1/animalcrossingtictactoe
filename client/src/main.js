//title screen
let deleteB = document.getElementById('deleteBtn');
deleteB.onclick = function() {
    let pVal = poinp.value;
    let pValtwo = ptinp.value;

    fetch("/api/players", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            name: pVal,
            nameTwo: pValtwo
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
            
            poinp.style.display = 'block';
            pois.style.display = 'block';
    
}

let gameScreen = document.getElementById('gameContent');
let title = document.getElementById('containerTitle');
title.onclick = function startGame() {
    title.setAttribute('class', 'title');
    gameScreen.style.display = 'block';
}

let mainContain = document.getElementById('mainGame');
let edit = document.getElementById('EditBtn');
let menuScreen = document.getElementById('gameMenu');

edit.onclick = function edit() {
    console.log('edt works');
   menuScreen.style.display = 'none';
   mainContain.style.display = 'none';
//    uiSelectOne.style.display = 'block';
poinp.style.display = 'block';
pois.style.display = 'block';

pois.onclick = function() {
    // let pVal = poinp.value;
    // createPOCBt.innerText = `Choose your character, ${pVal}!`;
    poinp.style.display = 'none';
    pois.style.display = 'none';
    ptinp.style.display = 'block';
    ptis.style.display = 'block';
} 

ptis.onclick = function() {
    ptinp.style.display = 'none';
    ptis.style.display = 'none';
    let pVal = poinp.value;
    let pValtwo = ptinp.value;
    fetch("/api/players", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            name: pVal,
            nameTwo: pValtwo
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
            
           uiSelectOne.style.display = 'block';
            preSpriteSelector.style.display = 'block'; 
 
    } 
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

let a = document.getElementById('g1');
let b = document.getElementById('g2');
let c = document.getElementById('g3');
let d = document.getElementById('g4');
let e = document.getElementById('g5');
let f = document.getElementById('g6');
let g = document.getElementById('g7');
let h = document.getElementById('g8');
let i = document.getElementById('g9');

let resetBtn = document.getElementById('resetG'); //WORK IN PROGRESS
resetBtn.onclick = function myfunc_2() {  
    a.value = '';
    b.value = '';
    c.value = '';
    d.value = '';
    e.value = '';
    f.value = '';
    g.value = '';
    h.value = '';
    i.value = '';
} 

let flag = 1; 
a.onclick = function myfunc_3() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g1").value = "x"; 
        document.getElementById("g1").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g1").value = "O"; 
        document.getElementById("g1").disabled = true; 
        flag = 1; 
    } 
} 
  
b.onclick = function myfunc_4() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g2").value = "x"; 
        document.getElementById("g2").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g2").value = "O"; 
        document.getElementById("g2").disabled = true; 
        flag = 1; 
    } 
} 
  
c.onclick = function myfunc_5() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g3").value = "x"; 
        document.getElementById("g3").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g3").value = "O"; 
        document.getElementById("g3").disabled = true; 
        flag = 1; 
    } 
} 
  
d.onclick = function myfunc_6() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g4").value = "x"; 
        document.getElementById("g4").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g4").value = "O"; 
        document.getElementById("g4").disabled = true; 
        flag = 1; 
    } 
} 
  
e.onclick = function myfunc_7() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g5").value = "x"; 
        document.getElementById("g5").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g5").value = "O"; 
        document.getElementById("g5").disabled = true; 
        flag = 1; 
    } 
} 
  
f.onclick = function myfunc_8() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g6").value = "x"; 
        document.getElementById("g6").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g6").value = "O"; 
        document.getElementById("g6").disabled = true; 
        flag = 1; 
    } 
} 
  
g.onclick = function myfunc_9() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g7").value = "x"; 
        document.getElementById("g7").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g7").value = "O"; 
        document.getElementById("g7").disabled = true; 
        flag = 1; 
    } 
} 
  
h.onclick = function myfunc_10() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g8").value = "x"; 
        document.getElementById("g8").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g8").value = "O"; 
        document.getElementById("g8").disabled = true; 
        flag = 1; 
    } 
} 
  
i.onclick = function myfunc_11() { 
    mfunc();
    if (flag == 1) { 
        document.getElementById("g9").value = "x"; 
        document.getElementById("g9").disabled = true; 
        flag = 0; 
    } 
    else { 
        document.getElementById("g9").value = "O"; 
        document.getElementById("g9").disabled = true; 
        flag = 1; 
    } 
} 
function mfunc() { 
    let g1, g2, g3, g4, g5, g6, g7, g8, g9; 
    g1 = document.getElementById("g1").value; 
    g2 = document.getElementById("g2").value; 
    g3 = document.getElementById("g3").value; 
    g4 = document.getElementById("g4").value; 
    g5 = document.getElementById("g5").value; 
    g6 = document.getElementById("g6").value; 
    g7 = document.getElementById("g7").value; 
    g8 = document.getElementById("g8").value; 
    g9 = document.getElementById("g9").value; 
  
    let b1btn, b2btn, b3btn, b4btn, b5btn,  
        b6btn, b7btn, b8btn, b9btn; 
          
    b1btn = document.getElementById("g1"); 
    b2btn = document.getElementById("g2"); 
    b3btn = document.getElementById("g3"); 
    b4btn = document.getElementById("g4"); 
    b5btn = document.getElementById("g5"); 
    b6btn = document.getElementById("g6"); 
    b7btn = document.getElementById("g7"); 
    b8btn = document.getElementById("g8"); 
    b9btn = document.getElementById("g9"); 
  
    if ((g1 == 'x' || g1 == 'X') && (g2 == 'x' || 
        g2 == 'X') && (g3 == 'x' || g3 == 'X')) { 
        document.getElementById('print').innerHTML = `Player X won`; 
        b4btn.disabled = true; 
        b5btn.disabled = true; 
        b6btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b1btn.style.color = "white"; 
        b2btn.style.color = "white"; 
        b3btn.style.color = "white"; 
    } 
    else if ((g1 == 'x' || g1 == 'X') && (g4 == 'x' || 
        g4 == 'X') && (g7 == 'x' || g7 == 'X')) { 
        document.getElementById('print').innerHTML = "Player X won"; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b5btn.disabled = true; 
        b6btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b1btn.style.color = "white"; 
        b4btn.style.color = "white"; 
        b7btn.style.color = "white"; 
    } 
    else if ((g7 == 'x' || g7 == 'X') && (g8 == 'x' || 
        g8 == 'X') && (g9 == 'x' || g9 == 'X')) { 
        document.getElementById('print').innerHTML = "Player X won";
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b4btn.disabled = true; 
        b5btn.disabled = true; 
        b6btn.disabled = true; 
  
        b7btn.style.color = "white";  
        b8btn.style.color = "white"; 
        b9btn.style.color = "white"; 
    } 
    else if ((g3 == 'x' || g3 == 'X') && (g6 == 'x' || 
        g6 == 'X') && (g9 == 'x' || g9 == 'X')) { 
        document.getElementById('print').innerHTML = "Player X won"; 
  
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b4btn.disabled = true; 
        b5btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
  
        b3btn.style.color = "white";  
        b6btn.style.color = "white";  
        b9btn.style.color = "white"; 
    } 
    else if ((g1 == 'x' || g1 == 'X') && (g5 == 'x' || 
        g5 == 'X') && (g9 == 'x' || g9 == 'X')) { 
        document.getElementById('print').innerHTML = "Player X won"; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b4btn.disabled = true; 
        b6btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
  
        b1btn.style.color = "white"; 
        b5btn.style.color = "white"; 
        b9btn.style.color = "white"; 
    } 
    else if ((g3 == 'x' || g3 == 'X') && (g5 == 'x' || 
        g5 == 'X') && (g7 == 'x' || g7 == 'X')) { 
        document.getElementById('print').innerHTML = "Player X won"; 
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b4btn.disabled = true; 
        b6btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b3btn.style.color = "white"; 
        b5btn.style.color = "white"; 
        b7btn.style.color = "white";  
    } 
    else if ((g2 == 'x' || g2 == 'X') && (g5 == 'x' || 
        g5 == 'X') && (g8 == 'x' || g8 == 'X')) { 
        document.getElementById('print').innerHTML = "Player X won"; 
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b4btn.disabled = true; 
        b6btn.disabled = true; 
        b7btn.disabled = true; 
        b9btn.disabled = true; 
  
        b2btn.style.color = "red"; 
        b5btn.style.color = "red"; 
        b8btn.style.color = "red"; 
    } 
    else if ((g4 == 'x' || g4 == 'X') && (g5 == 'x' || 
        g5 == 'X') && (g6 == 'x' || g6 == 'X')) { 
        document.getElementById('print').innerHTML = "Player X won"; 
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b4btn.style.color = "white";  
        b5btn.style.color = "white"; 
        b6btn.style.color = "white";  
    } 

    else if ((g1 == '0' || g1 == '0') && (g2 == '0' || 
        g2 == '0') && (g3 == '0' || g3 == '0')) { 
        document.getElementById('print').innerHTML = "Player 0 won"; 
        b4btn.disabled = true; 
        b5btn.disabled = true; 
        b6btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b1btn.style.color = "white";  
        b2btn.style.color = "white";  
        b3btn.style.color = "white";  
    } 
    else if ((g1 == '0' || g1 == '0') && (g4 == '0' || 
        g4 == '0') && (g7 == '0' || g7 == '0')) { 
        document.getElementById('print').innerHTML = "Player 0 won"; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b5btn.disabled = true; 
        b6btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b1btn.style.color = "white"; 
        b4btn.style.color = "white";  
        b7btn.style.color = "white";  
    } 
    else if ((g7 == '0' || g7 == '0') && (g8 == '0' || 
        g8 == '0') && (g9 == '0' || g9 == '0')) { 
        document.getElementById('print') 
            .innerHTML = "Player 0 won"; 
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b4btn.disabled = true; 
        b5btn.disabled = true; 
        b6btn.disabled = true; 
  
        b7btn.style.color ="white"; 
        b8btn.style.color = "white"; 
        b9btn.style.color = "white"; 
    } 
    else if ((g3 == '0' || g3 == '0') && (g6 == '0' || 
        g6 == '0') && (g9 == '0' || g9 == '0')) { 
        document.getElementById('print').innerHTML = "Player 0 won"; 
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b4btn.disabled = true; 
        b5btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
        b3btn.style.color = "white";  
        b6btn.style.color = "white"; 
        b9btn.style.color = "white";  
    } 
    else if ((g1 == '0' || g1 == '0') && (g5 == '0' || 
        g5 == '0') && (g9 == '0' || g9 == '0')) { 
        document.getElementById('print').innerHTML = "Player 0 won"; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b4btn.disabled = true; 
        b6btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
  
        b1btn.style.color = "white"; 
        b5btn.style.color = "white"; 
        b9btn.style.color = "white";  
    } 
    else if ((g3 == '0' || g3 == '0') && (g5 == '0' || 
        g5 == '0') && (g7 == '0' || g7 == '0')) { 
        document.getElementById('print').innerHTML = "Player 0 won"; 
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b4btn.disabled = true; 
        b6btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b3btn.style.color ="white"; 
        b5btn.style.color = "white";  
        b7btn.style.color = "white"; 
    } 
    else if ((g2 == '0' || g2 == '0') && (g5 == '0' || 
        g5 == '0') && (g8 == '0' || g8 == '0')) { 
        document.getElementById('print').innerHTML = "Player 0 won"; 
        b1btn.disabled = true; 
        b3btn.disabled = true; 
        b4btn.disabled = true; 
        b6btn.disabled = true; 
        b7btn.disabled = true; 
        b9btn.disabled = true; 
  
        b2btn.style.color = "white"; 
        b5btn.style.color = "white";  
        b8btn.style.color = "white";  
    } 
    else if ((g4 == '0' || g4 == '0') && (g5 == '0' || 
        g5 == '0') && (g6 == '0' || g6 == '0')) { 
        document.getElementById('print').innerHTML = "Player 0 won"; 
        b1btn.disabled = true; 
        b2btn.disabled = true; 
        b3btn.disabled = true; 
        b7btn.disabled = true; 
        b8btn.disabled = true; 
        b9btn.disabled = true; 
  
        b4btn.style.color = "white"; 
        b5btn.style.color ="white"; 
        b6btn.style.color = "white";  
    } 
    else if ((g1 == 'X' || g1 == '0') && (g2 == 'X'
        || g2 == '0') && (g3 == 'X' || g3 == '0') && 
        (g4 == 'X' || g4 == '0') && (g5 == 'X' || 
            g5 == '0') && (g6 == 'X' || g6 == '0') && 
        (g7 == 'X' || g7 == '0') && (g8 == 'X' || 
            g8 == '0') && (g9 == 'X' || g9 == '0')) { 
        document.getElementById('print').innerHTML = "Match Tie"; 
    } 
    else {  
        if (flag == 1) { 
            document.getElementById('print').innerHTML = "Currently Player X Turn"; 
        } 
        else { 
            document.getElementById('print').innerHTML = "Currently Player 0 Turn"; 
        } 
    } 
}

