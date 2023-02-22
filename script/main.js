const villagersCSV = './data/villagers.csv';

const charSelected = document.querySelector("#charSelected");
const btnSelect = document.querySelector("#btnSelect");
const imgCharacter = document.querySelector("#imgCharacter");
const titleCharacter = document.querySelector('#titleCharacter');
const charList = document.querySelector("#charList");

let villagers = [];
getVillagers();

async function getVillagers() {
    const request = await fetch(villagersCSV);
    const response = await request.text();

    const data = response.split('\r\n');

    const keys = data[0].split(',');

    for(let i = 1; i < data.length; i++) {
        const line = data[i].split(',');
        const obj = {
            [keys[0]]: line[0],
            [keys[1]]: './img/' + line[1]
        };
        villagers.push(obj);
    }
    console.log(villagers);

    initialize();
}

function initialize() {
    createCharButtons();
}

function createCharButtons() {
    villagers.forEach(villager => {
        console.log(villager);
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