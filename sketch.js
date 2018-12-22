let name, points, font, word, letter, pointSize, score, thickness, stepBack, showText, showPoints, connectPoints;

function preload() {
  font = loadFont('assets/Nunito-Regular.ttf');
}

function setup() {
  createCanvas(400, 400);
  showText = createCheckbox("Show text", true);
  showPoints = createCheckbox("Show points", false);
  connectPoints = createCheckbox("Connect points", false);

  stepBack = createButton("Back");

  name = createInput("Sprouts");
  name.input(reset);
  points = font.textToPoints(name.value(), 0, (height + pointSize) / 2, pointSize);

  pointSize = 150;
  thickness = 5;

  let sizePlus = createButton("+");
  sizePlus.mousePressed(() => {
    pointSize += 5;
    reset();
  });
  let sizeMinus = createButton("-");
  sizeMinus.mousePressed(() => {
    pointSize -= 5;
    reset();
  });
  let again = createButton("Try Again");
  again.mousePressed(reset);
  reset();
  stepBack.mousePressed(rewind);
}




function draw() {
  let totalHits = 0;
  let totalMisses = 0;
  background(255);
  stroke(0);
  strokeWeight(thickness);
  noFill();

  beginShape()
  for (let l of letter) {
    vertex(l.pos.x, l.pos.y);
  }
  endShape();

  for (let l of word) {
    beginShape();
    let hits = 0;
    let misses = 0;

    for (let s of l) {
      if (s.within) {
        hits++;
      } else {
        misses++;
      }
      vertex(s.pos.x, s.pos.y);
    }

    endShape();
    totalHits += hits;
    totalMisses += misses;
  }

  textFont(font);
  if (showText.checked()) {
    stroke(0, 100);
    noFill();
    strokeWeight(1);
    textSize(pointSize);
    text(name.value(), 0, (height + pointSize) / 2);
  }
  stroke(0);
  strokeWeight(1);
  fill(0);
  textSize(20);
  if (score > 0) {
    text("Score: " + score + "%", 0, 20);
  } else {
    text("Score: ", 0, 20);
  }

  if (totalHits + totalMisses == 0) {
    score = 0;
  } else {
    score = floor(totalHits / (totalHits + totalMisses) * 100);
  }
  if (showPoints.checked()) {
    for (let p of points) {
      ellipse(p.x, p.y, 2);
    }
  }
  if (connectPoints.checked()) {
    beginShape();
    for (let p of points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}


function reset() {
  word = [];
  letter = [];
  score = 0;
  let newCanvasSize = font.textBounds(name.value(), 0, (height + pointSize) / 2, pointSize)
  if (newCanvasSize.w > 0 && newCanvasSize.h > 0) {
    resizeCanvas(newCanvasSize.w + 30, height);
  }
  points = font.textToPoints(name.value(), 0, (height + pointSize) / 2, pointSize);
}

function mouseDragged() {
  letter.push(new Point(mouseX, mouseY, points, word));
}

function mouseReleased() {
  if (letter.length > 0) {
    word.push(letter);
    letter = [];
  }
}

function rewind() {
  word.pop();
}