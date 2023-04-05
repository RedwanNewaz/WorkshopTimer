
let array = [0, 1, 2, 3, 4, 5, 6, 7];
let index = 1;

let button;

let table;
const wrapLen = 500;
const seed = 323;

let red = [0, 0, 255];
let black = [0, 0, 0];


const textXoffset = 11;
const textYoffset = 70;

const pageXoffset = 300;
const pageYoffset = 180;

let img;
let radio;
let muteStatus;
let vsMusic;

function randomShuffle() {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(random(array.length));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function preload() {
    table = loadTable('assets/CSCI-6650-teams.csv', 'csv', 'header');
    img = loadImage('assets/vs-logo.png');
    
}
  
function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(160);

    randomSeed(seed);
    randomShuffle();

    button = createButton('Next');
    button.size(150, 150);
    button.position(100, 100);
    button.mousePressed(changeBG);
    button.style("font-family", "Comic Sans MS");
    button.style("font-size", "48px");

    textSize(20);

    radio = createRadio();
    radio.option('1', 'mute');
    radio.option('2', 'unmute');
    radio.selected('2');
    radio.position(width - 200, 100);

    vsMusic = loadSound('./assets/vs-sound.wav');
}

function showText(r, yIndex) {
   
    let space = [];
    for (let c = 0; c < table.getColumnCount(); c++) {
        let len = textXoffset * table.getString(r, c).length;
        len = min(len, wrapLen);
        if(c > 0)
        {
            len += space[c - 1];
            len = max(len, wrapLen + 10);
        }
        space.push(len);
    }
    textWrap(WORD);
    for (let c = 0; c < table.getColumnCount(); c++) {
        let data = table.getString(r, c);
        if(c == 1)
        {
            fill(red);
            data = parseInt(index / 2) + 1 + ". " + data;
        }
        else{
            fill(black);
        }

        if(c < table.getColumnCount() - 1 && c > 1)
            data += ', ';
        text(data,
            pageXoffset + space[c - 1],
            pageYoffset + textYoffset * yIndex, wrapLen);
    }
}

function changeBG(){
    clear();
    showText(array[index-1], 1);
    image(img, pageXoffset + 300, pageYoffset + textYoffset * 2);



    showText(array[index], 6);
    index = (index + 2) % array.length;
    if(!muteStatus)
    {
        vsMusic.play();
    }
}


function draw() {
    let val = radio.value();
    muteStatus = (val == 1);
   
  }