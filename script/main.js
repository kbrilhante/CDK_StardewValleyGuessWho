const villagersCSV = './data/villagers.csv';

const charSelected = document.querySelector("#charSelected");
// const btnSelect = document.querySelector("#btnSelect");
// const imgCharacter = document.querySelector("#imgCharacter");
// const titleCharacter = document.querySelector('#titleCharacter');
const charList = document.querySelector("#charList");

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

    initialize();
    newGame();
}

function initialize() {
    createCharButtons();
}

function createCharButtons() {
    charList.innerHTML = '';
    villagers.forEach(villager => {
        const divCol = document.createElement('div');
        divCol.className = 'col';
        charList.appendChild(divCol);
        const btn = document.createElement('button');
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
    const button = document.getElementById(btnID);
    
    if (charPicked) {
        const p = button.children[1];
        const btnValue = button.value;
        if (btnValue) {
            button.value = false;
            button.classList.remove('charOn');
            button.classList.add('charOff');
            p.classList.remove('bg-primary-subtle');
            p.classList.add('bg-light');
            p.classList.add('text-dark');
        } else {
            button.value = true;
            button.classList.remove('charOff');
            button.classList.add('charOn');
            p.classList.remove('bg-light');
            p.classList.remove('text-dark');
            p.classList.add('bg-primary-subtle');
        }
    } else {
        const characterSrc = button.children[0].src;
        charSelected.innerHTML = "";
        const btnNew = document.createElement('button');
        btnNew.className = 'btn btn-dark bg-gradient d-block mx-auto';
        btnNew.onclick = newGame;
        btnNew.textContent = 'New Game';
        charSelected.appendChild(btnNew);
        const charImg = document.createElement('img');
        charImg.src = characterSrc;
        charSelected.appendChild(charImg);
        const charName = document.createElement('h3');
        charName.textContent = btnID;
        charName.className = 'text-light bg-success-subtle bg-gradient py-2 rounded-start-3 border border-2 border-dark-subtle'
        charSelected.appendChild(charName);
        charPicked = true;
    }
}

function newGame() {
    charSelected.innerHTML = '';
    charPicked = false;
    createCharButtons();
}
