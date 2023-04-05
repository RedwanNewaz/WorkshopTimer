let table;
const wrapLen = 500;

let red = [0, 0, 255];
let black = [0, 0, 0];


const textXoffset = 11;
const textYoffset = 70;

const pageXoffset = 100;
const pageYoffset = 80;


function preload() {
  table = loadTable('assets/CSCI-6650-teams.csv', 'csv', 'header');
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(20);  
    // Display the table
    showTable();
  }

function showTable() {
    clear();    
    // Show all the rows currently
    // present in the table
    for (let r = 0; r < table.getRowCount(); r++) {
        const space = [];
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
      for (let c = 1; c < table.getColumnCount(); c++) {
        let data = table.getString(r, c);
        if(c == 1)
        {
            fill(red);
            data = r + 1 + ". " + data;
        }
        else{
            fill(black);
        }

        if(c < table.getColumnCount() - 1 && c > 1)
            data += ', ';

        textWrap(WORD);
        text(data,
            pageXoffset + space[c - 1],
            pageYoffset + textYoffset * r, wrapLen);
        // console.log(space[c]);
      }
    }
  }