
let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

let lastTimepoint;
let lastSecond;
let currMinute; 
let countDownStart;


let startMusic;
let stopMusic;
let input, submit_button;
let timeBudget;
let button;

let xPos;

function setup() {
//   createCanvas(720, 400);
  createCanvas(windowWidth, windowHeight);
  stroke(255);

  timeBudget = 15;

  input = createInput(timeBudget);
  xPos = width - 200 - input.width;  
  input.position( xPos, 75);
  input.input(handleInput);

  button = createButton('submit');
  button.position(input.x + input.width, 75);


  // button.mousePressed(greet);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 2;
  
  // alarm related
  lastTimepoint = millis();
  lastSecond = currMinute = 0;
  textSize(160);

  // button related 
  countDownStart = false;

  button = createButton('reset');
  button.size(150, 150);
//   button.labelSize(160);
  button.position(100, 100);
  button.mousePressed(changeBG);
  button.style("font-family", "Comic Sans MS");
  button.style("font-size", "48px");

  // alarm related
  startMusic = loadSound('./assets/bell-sound.wav');
  stopMusic = loadSound('./assets/finished-sound.wav');

}


function changeBG() {
    currMinute = 0;
    lastTimepoint = millis();
    let val = random(255);

    if(countDownStart) {
        stopMusic.play();
    } else {
        startMusic.play();
    }
    
    countDownStart = !countDownStart;
    background(val);
   
  }



function countDown()
{

    if(!countDownStart)
    return;

    fill(237, 34, 93);
  
  ellipse(cx, cy, clockDiameter + 50, clockDiameter + 50);

  let elapsedTime = millis() - lastTimepoint; 
  
  let second = elapsedTime / 1000;
  
  // increase minute counter 
  if( (second - lastSecond) >= 1 && currMinute <= timeBudget)
  {
      if(second >= 60)
      {
        currMinute = currMinute + 1;
        second = 0;
        lastTimepoint = millis();
      }
    lastSecond = second;
    
  }
  
   second = min(second, 60);
     // visualize alarm time backward
  let finalText = (timeBudget - currMinute - 1).toFixed(0).padStart(2, '0') + ":" + (60 - second).toFixed(0).padStart(2, '0');
   text(finalText, cx - 200, cy - 50);

   if(currMinute >= timeBudget)
   {
     changeBG()
   }
  
 

    
    
}

function draw() {
  background(230);

  // Draw the clock background
  noStroke();
//   fill(244, 122, 158);

  fill(170, 170, 170);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  strokeWeight(5);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(10);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(20);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  strokeWeight(10);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();

  textSize(18);
  text('change time budget', xPos, 15);
  textSize(160);
  
  countDown();
  
}


function handleInput() {
  let val = this.value();
  timeBudget = parseInt(val);
  // console.log('you are typing: ', timeBudget);
  
}
