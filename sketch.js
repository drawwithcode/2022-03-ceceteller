let capture;
let detailX;
let detailY;
let valBG = [
  "Purple",
  "SaddleBrown",
  "HotPink",
  "MidnightBlue",
  "Black",
  "Lime",
  "Gold",
  "SlateBlue",
];
let nums = [1, 2, 3, 4, 5, 6, 7, 8];
let myButtons = [];
let myTracks = [];
let analyzer = [];
let myFont;
let myText;

function preload() {
  //carico le tracce
  for (let i = 0; i < 8; i++) {
    myTracks[i] = loadSound("./assets/Track" + nums[i] + ".mp3");
  }

  myFont = loadFont("fonts/SourceCodePro-Bold.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  myBG = "MidnightBlue";
  background(myBG);

  analyzer = new p5.Amplitude();
  for (let i = 0; i < 8; i++) {
    analyzer.setInput(myTracks[i]);
  }

  capture = createCapture(VIDEO);
  capture.hide();

  myText = "Dance the night away";
  myText2 =
    "MOVE THE SLIDERS TO SHAPE YOUR BALL,\nTHEN BE THE DJ, CHOOSE YOUR SONG AND";

  //disegno bottoni
  for (let i = 0; i < 8; i++) {
    myButtons[i] = createButton(nums[i]).position(
      width + ((windowWidth / 2) * i) / 8 - 1265,
      windowHeight - 180
    );
    myButtons[i].style("background-color", valBG[i]);
    myButtons[i].style("color", "white");
    myButtons[i].style("cursor", "pointer");
    myButtons[i].style("font-family", "Source Code Pro");
    myButtons[i].style("font-size", "40px");
    myButtons[i].style("width", "70px");
    myButtons[i].style("height", "70px");
    myButtons[i].style("border-radius", "100px");
    myButtons[i].style("border: 3px  solid white");

    //descrivo azione click bottoni
    myButtons[i].mousePressed(function () {
      if (myTracks[i].isPlaying()) {
        myTracks[i].stop();
      } else {
        for (let j = 0; j < 8; j++) {
          if (j != i) {
            myTracks[j].stop(); //se un'altra canzone sta già suonando si stoppa
          }
        }
        myTracks[i].play();
        myBG = random(valBG);
      }
    });
  }

  frameRate(24);

  //sliders
  detailX = createSlider(0, 22, 60);
  detailX.position(50, windowHeight - 80);
  detailX.style("width", "1625px");

  detailY = createSlider(0, 22, 60);
  detailY.position(50, windowHeight - 50);
  detailY.style("width", "1625px");
}
function draw() {
  background(myBG);
  pixelDensity(10);

  volume = analyzer.getLevel(); //descrizione volume
  volume = map(volume, 0, 1, 250, height / 2);
  console.log(volume);

  //testi
  fill(random(valBG));
  textFont(myFont);
  textAlign(CENTER);
  textSize(50);
  text(myText, 0, 0 - windowHeight / 2.8);

  fill("white");
  textFont(myFont);
  textAlign(CENTER);
  textSize(20);
  text(myText2, 0, 0 - windowHeight / 2.25);

  //luci
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  ambientLight(230);
  spotLight(0, 255, 0, locX, locY, 10000, 0, 0, -1, 10, 100000); //verde
  spotLight(0, 0, 255, -locX, -locY, 10000, 0, 0, -1, 100, 100000); //blu
  spotLight(250, 0, 0, locX / 2, locY / 2, 10000, 0, 0, -1, 10, 100000); //rosso
  spotLight(250, 250, 0, -locX / 2, -locY / 2, 10000, 0, 0, -1, 10, 100000); //giallo
  spotLight(255, 255, 255, locX / 10, locY / 10, 10000, 0, 0, -1, 10, 1000000); //bianco centrale

  //disco rotante

  rotateY(millis() / 20000);
  strokeWeight(5);
  stroke("MidnightBlue");
  texture(capture);
  ellipsoid(volume, volume, volume, detailX.value(), detailY.value());
}

function changeBG() {
  background(random(val));
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}
