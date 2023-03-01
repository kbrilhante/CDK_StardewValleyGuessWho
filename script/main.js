const villagersCSV = './data/villagers.txt';

const optionsBar = document.getElementById("optionsBar");
const instructions = document.getElementById('instructions');
const btnNewGame = document.getElementById('btnNewGame');
const charSelected = document.getElementById("charSelected");
const charListRow = document.getElementById("charListRow");
const charListCol = document.getElementById("charListCol");

let charPicked = false;

let villagers = [];
getVillagers();

async function getVillagers() {
    console.log('awaiting villagers');
    const request = await fetch(villagersCSV);
    const response = await request.text();

    console.log('got villagers');
    // console.log(response);

    const data = response.split('\r\n');

    const keys = data[0].split(',');

    for (let i = 1; i < data.length; i++) {
        const line = data[i].split(',');
        const obj = {
            [keys[0]]: line[0],
            [keys[1]]: './img/' + line[1]
        };
        villagers.push(obj);
    }
    newGame();
}

function newGame() {
    charSelected.innerHTML = '';
    charPicked = false;
    instructions.textContent = 'Pick your character';
    // btnNewGame.style.display = 'none';
    createCharbtnCharacters();
    yourPickSign();
    addEventListener("resize", resizeButtons);
    resizeButtons();
    toggleButton();
}

function createCharbtnCharacters() {
    charListRow.innerHTML = '';
    villagers.forEach(villager => {
        const divCol = document.createElement('div');
        divCol.className = 'col m-0 p-0';
        charListRow.appendChild(divCol);
        const btn = document.createElement('button');
        btn.id = villager.character;
        btn.value = true;
        btn.className = 'btn bg-gradient border border-2 border-dark-subtle p-0 m-1 charButton charOn';
        btn.setAttribute("onclick", "handle(this.id)");
        divCol.appendChild(btn);
        const img = document.createElement("img");
        img.src = villager.imageFile;
        btn.appendChild(img);
        const p = document.createElement('p');
        p.textContent = villager.character;
        p.className = 'm-0 py-1 fs-6 text-light bg-primary-subtle bg-gradient rounded-bottom-1';
        btn.appendChild(p);
    });
}

function handle(btnID) {
    const btnCharacter = document.getElementById(btnID);
    if (charPicked) {
        const p = btnCharacter.children[1];
        if (btnCharacter.value === 'true') {
            btnCharacter.value = false;
            btnCharacter.classList.remove('charOn');
            btnCharacter.classList.add('charOff');
            p.classList.remove('bg-primary-subtle');
            p.classList.add('bg-light');
            p.classList.add('text-dark');
        } else {
            btnCharacter.value = true;
            btnCharacter.classList.remove('charOff');
            btnCharacter.classList.add('charOn');
            p.classList.remove('bg-light');
            p.classList.remove('text-dark');
            p.classList.add('bg-primary-subtle');
        }
    } else {
        pickCharacter(btnCharacter);
    }
}

function pickCharacter(btnCharacter) {
    const characterSrc = btnCharacter.children[0].src;
    charSelected.innerHTML = "";
    yourPickSign();
    const charImg = document.createElement('img');
    charImg.src = characterSrc;
    charSelected.appendChild(charImg);
    const charName = document.createElement('h3');
    charName.textContent = btnCharacter.id;
    charName.className = 'text-light bg-primary-subtle bg-gradient p-2 rounded-bottom-3 me-0';
    charSelected.appendChild(charName);
    charPicked = true;
    instructions.textContent = "";
    resizeButtons();
    toggleButton();
}

function yourPickSign() {
    const yourPick = document.createElement('h4');
    yourPick.textContent = 'Your pick:';
    yourPick.className = 'text-light bg-primary-subtle bg-gradient p-2 rounded-top-3 me-0'
    charSelected.appendChild(yourPick);
}

function resizeButtons() {
    let csCharListCol = getComputedStyle(charListCol)
    // console.log(csCharListCol);
    const listWidth = parseInt(csCharListCol.width);
    let availableWidth = listWidth;
    availableWidth -= getXMBP(charListCol);
    availableWidth -= getXMBP(charListRow);
    // console.log(listWidth);

    if (listWidth >= 828) {
        resizeImages(9, availableWidth);
    } else if (listWidth >= 735) {
        resizeImages(8, availableWidth);
    } else if (listWidth >= 642) {
        resizeImages(7, availableWidth);
    } else if (listWidth >= 549) {
        resizeImages(6, availableWidth);
    } else if (listWidth >= 456) {
        resizeImages(5, availableWidth);
    } else if (listWidth >= 363) {
        resizeImages(4, availableWidth);
    } else if (listWidth >= 270) {
        resizeImages(3, availableWidth);
    } else {
        resizeImages(2, availableWidth);
    }
}

function resizeImages(rowSize, availableWidth) {
    const portrait = document.querySelector(".charButton");
    let portraitBorders = getXMBP(portrait);
    portraitBorders += getXMBP(portrait.parentElement);
    portraitBorders += 6;
    // console.log(rowSize);
    const charButtonsList = document.querySelectorAll(".charButton");
    charButtonsList.forEach(charButton => {
        // console.log(charButton.children[0]);
        charButton.children[0].width = (availableWidth / rowSize) - portraitBorders;
    });
}

function getXMBP(element) { // gets left and right margins, borders and padding of an element
    let measurements = 0;
    const cs = getComputedStyle(element);
    measurements += parseInt(cs.marginLeft);
    measurements += parseInt(cs.marginRight);
    measurements += parseInt(cs.borderLeftWidth);
    measurements += parseInt(cs.borderRightWidth);
    measurements += parseInt(cs.paddingLeft);
    measurements += parseInt(cs.paddingRight);
    // console.log(measurements);
    return measurements;
}

function random() {
    const charButtonsList = document.querySelectorAll(".charButton");
    const listLength = charButtonsList.length;
    const dice = Math.floor(Math.random() * listLength);
    pickCharacter(charButtonsList[dice]);
}

function toggleButton() {
    if (charPicked) {
        btnNewGame.textContent = "New Game";
        btnNewGame.onclick = newGame; 
    } else {
        btnNewGame.textContent = "Random Pick";
        btnNewGame.onclick = random; 
    }
}