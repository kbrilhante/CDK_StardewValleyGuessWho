const villagersCSV = './data/villagers.csv';

const optionsBar = document.getElementById("optionsBar");
const instructions = document.getElementById('instructions');
const btnNewGame = document.getElementById('btnNewGame');
const charSelected = document.getElementById("charSelected");
const charList = document.getElementById("charList");

let charPicked = false;

let villagers = [];
getVillagers();

async function getVillagers() {
    const request = await fetch(villagersCSV);
    const response = await request.text();

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
    btnNewGame.style.display = 'none';
    createCharbtnCharacters();
}

function createCharbtnCharacters() {
    charList.innerHTML = '';
    villagers.forEach(villager => {
        const divCol = document.createElement('div');
        divCol.className = 'col';
        charList.appendChild(divCol);
        const btn = document.createElement('btnCharacter');
        btn.id = villager.character;
        btn.value = true;
        btn.className = 'btn bg-gradient charOn';
        btn.setAttribute("onclick", "handle(this.id)");
        divCol.appendChild(btn);
        const img = document.createElement("img");
        img.src = villager.imageFile;
        btn.appendChild(img);
        const p = document.createElement('p');
        p.textContent = villager.character;
        p.className = 'py-1 fs-6 text-light bg-primary-subtle bg-gradient border border-2 border-dark-subtle rounded-1';
        btn.appendChild(p);
    });
}

function handle(btnID) {
    const btnCharacter = document.getElementById(btnID);
    if (charPicked) {
        const p = btnCharacter.children[1];
        const btnValue = btnCharacter.value;
        if (btnValue) {
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
        const characterSrc = btnCharacter.children[0].src;
        charSelected.innerHTML = "";
        const yourPick = document.createElement('h4');
        yourPick.textContent = 'Your pick:';
        yourPick.className = 'text-light bg-dark-subtle bg-gradient py-2 rounded-start-3 border border-2 border-dark-subtle'
        charSelected.appendChild(yourPick);
        const charImg = document.createElement('img');
        charImg.src = characterSrc;
        charSelected.appendChild(charImg);
        const charName = document.createElement('h3');
        charName.textContent = btnID;
        charName.className = 'text-light bg-success-subtle bg-gradient py-2 rounded-start-3 border border-2 border-dark-subtle'
        charSelected.appendChild(charName);
        charPicked = true;
        instructions.textContent = "";
        btnNewGame.style.display = "inline-block";
    }
}

